import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Nexus DevHub'

interface ContactConfirmationProps {
  name?: string
}

const ContactConfirmationEmail = ({ name }: ContactConfirmationProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Recebemos sua mensagem — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Obrigado, ${name}!` : 'Obrigado pelo contato!'}
        </Heading>
        <Text style={text}>
          Recebemos sua mensagem e nossa engenharia retornará em até 24h úteis
          para falar sobre seu desafio.
        </Text>
        <Text style={text}>
          Enquanto isso, fique à vontade para responder este e-mail com
          qualquer informação adicional.
        </Text>
        <Text style={footer}>Equipe {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'Recebemos sua mensagem — Nexus DevHub',
  displayName: 'Confirmação de contato',
  previewData: { name: 'João' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '600px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#0a0a0a',
  margin: '0 0 16px',
}
const text = {
  fontSize: '14px',
  color: '#55575d',
  lineHeight: '1.6',
  margin: '0 0 16px',
}
const footer = {
  fontSize: '12px',
  color: '#999',
  margin: '32px 0 0',
}
