import { useState } from 'react'
import { submitEnquiry } from './submitEnquiry'

export default function EnquiryForm({ compact = false }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const fields = Object.fromEntries(new FormData(form))
    setStatus('sending')
    setError('')
    try {
      await submitEnquiry(fields)
      setStatus('sent')
      form.reset()
    } catch (failure) {
      setError(failure.name === 'TimeoutError' ? 'The request timed out. Please try again, or call 9432497485.' : 'Your enquiry could not be submitted. Check your internet connection and try again, or call 9432497485.')
      setStatus('error')
    }
  }
  return <form className={compact ? 'hero-enquiry' : 'contact-enquiry'} onSubmit={submit} aria-busy={status === 'sending'}>
    <input className="enquiry-honeypot" name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    <input type="hidden" name="enquiry_source" value={compact ? 'Homepage website enquiry' : 'Portfolio contact enquiry'}/>
    <div className="form-row">
      <label>Your name<input name="name" placeholder="Your full name" autoComplete="name" maxLength={100} required/></label>
      <label>Phone number<input name="phone" type="tel" inputMode="tel" placeholder="Your contact number" autoComplete="tel" pattern="[+0-9() .-]{7,25}" title="Enter your contact number, including country code if needed." maxLength={25} required/></label>
    </div>
    {compact ? <input type="hidden" name="service" value="Website design enquiry"/> : <>
      <label>Email address (optional)<input name="email" type="email" placeholder="you@example.com" autoComplete="email"/></label>
      <label>What do you need?<select name="service"><option>Website design</option><option>E-commerce web design</option><option>Corporate communications & print design</option><option>Personal & occasion print design</option><option>Multiple design services</option></select></label>
      <label>Tell me about your project (optional)<textarea name="message" placeholder="Your idea, goals, timeline..." rows={4} maxLength={5000}/></label>
    </>}
    <button className="button primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending enquiry...' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
    <p className="form-note">Your details are sent to Priyanka via <a href="https://formsubmit.co/" target="_blank" rel="noopener noreferrer">FormSubmit</a> so she can contact you about your project.</p>
    {status === 'sent' && <p className="success-message" role="status">Thank you! Your enquiry has been submitted. Priyanka will be in touch.</p>}
    {status === 'error' && <p className="enquiry-error" role="alert">{error}</p>}
  </form>
}
