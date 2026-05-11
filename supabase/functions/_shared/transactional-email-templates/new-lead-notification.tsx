import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Nexus DevHub'

interface NewLeadNotificationProps {
  name?: string
  email?: string
  company?: string
  phone?: string
  sector?: string
  message?: string
  submittedAt?: string
}

const NewLeadNotificationEmail = ({
  name = '—',
  email = '—',
  company = '—',
  phone = '—',
  sector = '—',
  message = '—',
  submittedAt,
}: NewLeadNotificationProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Novo lead: {name} ({company}) — {sector}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Novo lead recebido</Heading>
        <Text style={lead}>
          Um novo contato foi enviado pelo site {SITE_NAME}.
        </Text>

        <Section style={card}>
          <Text style={row}><span style={label}>Nome: </span>{name}</Text>
          <Text style={row}><span style={label}>Empresa: </span>{company}</Text>
          <Text style={row}><span style={label}>Setor: </span>{sector}</Text>
          <Text style={row}><span style={label}>E-mail: </span>{email}</Text>
          <Text style={row}><span style={label}>Telefone: </span>{phone}</Text>
        </Section>

        <Heading as="h2" style={h2}>Mensagem</Heading>
        <Text style={messageText}>{message}</Text>

        {submittedAt && (
          <>
            <Hr style={hr} />
            <Text style={meta}>Enviado em {submittedAt}</Text>
          </>
        )}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewLeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    `Novo lead${data?.sector ? ` [${data.sector}]` : ''}: ${data?.name ?? 'Contato'}${data?.company ? ` (${data.company})` : ''}`,
  to: 'comercial@nexusdevhub.com',
  displayName: 'Novo lead — notificação interna',
  previewData: {
    name: 'João Silva',
    email: 'joao@empresa.com',
    company: 'Empresa LTDA',
    phone: '(11) 91234-5678',
    sector: 'Varejo / E-commerce',
    message: 'Gostaria de automatizar nosso processo de vendas.',
    submittedAt: '20/04/2026 12:34',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
}
const container = { padding: '32px 28px', maxWidth: '600px' }
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#0a0a0a',
  margin: '0 0 12px',
}
const h2 = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#0a0a0a',
  margin: '24px 0 8px',
}
const lead = {
  fontSize: '14px',
  color: '#55575d',
  lineHeight: '1.5',
  margin: '0 0 20px',
}
const card = {
  backgroundColor: '#f5f5f7',
  borderRadius: '12px',
  padding: '20px 24px',
  margin: '0 0 8px',
}
const row = { fontSize: '14px', color: '#0a0a0a', margin: '6px 0' }
const label = { color: '#55575d', fontWeight: 600 }
const messageText = {
  fontSize: '14px',
  color: '#0a0a0a',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
  margin: '0',
}
const hr = { borderColor: '#e5e5e7', margin: '24px 0 12px' }
const meta = { fontSize: '12px', color: '#999', margin: '0' }
