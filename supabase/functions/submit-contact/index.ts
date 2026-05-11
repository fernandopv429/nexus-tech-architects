import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const trimStr = (v: unknown, max: number): string | null => {
  if (typeof v !== 'string') return null
  const s = v.trim()
  if (!s || s.length > max) return null
  return s
}

const isEmail = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseServiceKey) {
    return json({ error: 'Server configuration error' }, 500)
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const name = trimStr(body.name, 120)
  const email = trimStr(body.email, 254)
  const company = trimStr(body.company, 200)
  const phone = trimStr(body.phone, 40)
  const sector = trimStr(body.sector, 80)
  const message = trimStr(body.message, 5000)
  const source = trimStr(body.source, 40) ?? 'contact'

  if (!name || !email || !company || !phone || !message || !isEmail(email)) {
    return json({ error: 'Invalid input' }, 400)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  const id = crypto.randomUUID()

  const { error: insertError } = await supabase
    .from('contact_submissions')
    .insert({ id, name, email, company, phone, message, sector })

  if (insertError) {
    console.error('Insert failed', insertError)
    return json({ error: 'Failed to save submission' }, 500)
  }

  const submittedAt = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })

  // Fire-and-forget transactional emails (server-side, fixed recipients)
  const invokeEmail = async (templateName: string, recipientEmail: string, key: string, templateData: Record<string, unknown>) => {
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseServiceKey}`,
          apikey: supabaseServiceKey,
        },
        body: JSON.stringify({
          templateName,
          recipientEmail,
          idempotencyKey: key,
          templateData,
        }),
      })
      if (!res.ok) console.error('email invoke failed', templateName, res.status, await res.text())
    } catch (e) {
      console.error('email invoke error', templateName, e)
    }
  }

  await invokeEmail('new-lead-notification', 'comercial@nexusdevhub.com', `${source}-notify-${id}`, {
    name, email, company, phone, sector, message, submittedAt,
  })
  await invokeEmail('contact-confirmation', email, `${source}-confirm-${id}`, { name })

  return json({ success: true, id })
})
