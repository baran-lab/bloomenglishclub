import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Bloom English Club"
const SITE_URL = "https://bloomenglish.club"

interface AccessCodeInviteProps {
  name?: string
  accessCode?: string
}

const AccessCodeInviteEmail = ({ name, accessCode }: AccessCodeInviteProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your access code for {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Text style={logoText}>🐝 {SITE_NAME}</Text>
        </Section>

        <Heading style={h1}>
          Hi {name || 'there'},
        </Heading>

        <Text style={text}>
          Welcome! I'm happy to have you in our English learning program.
        </Text>

        <Text style={text}>
          Here is your access code:
        </Text>

        <Section style={codeSection}>
          <Text style={codeText}>{accessCode || 'BLOOM-XXXXX'}</Text>
        </Section>

        <Section style={ctaSection}>
          <Button style={button} href={`${SITE_URL}/signup`}>
            Click here to start →
          </Button>
        </Section>

        <Text style={text}>
          Please create your account and enter your code when asked.
        </Text>

        <Text style={warningText}>
          ⚠️ This code is only for you. Please do not share it.
        </Text>

        <Hr style={hr} />

        <Text style={text}>
          If you have any questions, I'm here to help.
        </Text>

        <Text style={text}>
          Enjoy learning English! 🎉
        </Text>

        <Text style={footer}>
          Best,<br />
          The {SITE_NAME} Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AccessCodeInviteEmail,
  subject: `Your Access Code for ${SITE_NAME}`,
  displayName: 'Access code invite',
  previewData: { name: 'Sarah', accessCode: 'BLOOM-A1B2C' },
} satisfies TemplateEntry

// Styles — matching Bloom English Club brand
const main = { backgroundColor: '#ffffff', fontFamily: "'Nunito', Arial, sans-serif" }
const container = { padding: '30px 25px', maxWidth: '520px', margin: '0 auto' }
const logoSection = { textAlign: 'center' as const, marginBottom: '24px' }
const logoText = { fontSize: '22px', fontWeight: '700', color: 'hsl(175, 60%, 40%)', margin: '0' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: 'hsl(220, 25%, 20%)', margin: '0 0 16px' }
const text = { fontSize: '15px', color: 'hsl(220, 15%, 40%)', lineHeight: '1.6', margin: '0 0 16px' }
const codeSection = {
  backgroundColor: 'hsl(40, 33%, 96%)',
  border: '2px dashed hsl(175, 60%, 40%)',
  borderRadius: '12px',
  padding: '16px',
  textAlign: 'center' as const,
  margin: '8px 0 20px',
}
const codeText = {
  fontSize: '28px',
  fontWeight: '800',
  letterSpacing: '4px',
  color: 'hsl(175, 60%, 35%)',
  fontFamily: "'Courier New', monospace",
  margin: '0',
}
const ctaSection = { textAlign: 'center' as const, margin: '24px 0' }
const button = {
  backgroundColor: 'hsl(175, 60%, 40%)',
  color: '#ffffff',
  padding: '14px 32px',
  borderRadius: '20px',
  fontSize: '16px',
  fontWeight: '700',
  textDecoration: 'none',
  display: 'inline-block',
}
const warningText = {
  fontSize: '14px',
  color: 'hsl(35, 95%, 40%)',
  backgroundColor: 'hsl(40, 100%, 95%)',
  padding: '10px 14px',
  borderRadius: '8px',
  margin: '0 0 16px',
}
const hr = { borderColor: 'hsl(40, 20%, 88%)', margin: '24px 0' }
const footer = { fontSize: '14px', color: 'hsl(220, 15%, 50%)', lineHeight: '1.5', margin: '0' }
