import { useForm, ValidationError } from '@formspree/react'

export default function EnquiryForm({ compact = false }) {
  const [state, handleSubmit, reset] = useForm('mjyydekn')
  if (state.succeeded) return <div className={compact ? 'hero-enquiry' : 'contact-enquiry'}>
    <p className="success-message" role="status">Thank you! Your enquiry has been submitted. Priyanka will be in touch.</p>
    <button className="button primary" type="button" onClick={reset}>Send another enquiry</button>
  </div>
  return <form className={compact ? 'hero-enquiry' : 'contact-enquiry'} action="https://formspree.io/f/mjyydekn" method="POST" onSubmit={handleSubmit} aria-busy={state.submitting}>
    <input className="enquiry-honeypot" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    <input type="hidden" name="subject" value="New design enquiry - Priyanka Kalla Portfolio"/>
    <input type="hidden" name="enquiry_source" value={compact ? 'Homepage website enquiry' : 'Portfolio contact enquiry'}/>
    <div className="form-row">
      <label>Your name<input name="name" placeholder="Your full name" autoComplete="name" maxLength={100} required/><ValidationError prefix="Name" field="name" errors={state.errors} className="enquiry-error"/></label>
      <label>Phone number<input name="phone" type="tel" inputMode="tel" placeholder="Your contact number" autoComplete="tel" pattern="[+0-9() .-]{7,25}" title="Enter your contact number, including country code if needed." maxLength={25} required/><ValidationError prefix="Phone" field="phone" errors={state.errors} className="enquiry-error"/></label>
    </div>
    {compact ? <input type="hidden" name="service" value="Website design enquiry"/> : <>
      <label>Email address (optional)<input name="email" type="email" placeholder="you@example.com" autoComplete="email"/><ValidationError prefix="Email" field="email" errors={state.errors} className="enquiry-error"/></label>
      <label>What do you need?<select name="service"><option>Website design</option><option>E-commerce web design</option><option>Corporate communications & print design</option><option>Personal & occasion print design</option><option>Multiple design services</option></select></label>
      <label>Tell me about your project (optional)<textarea name="message" placeholder="Your idea, goals, timeline..." rows={4} maxLength={5000}/><ValidationError prefix="Message" field="message" errors={state.errors} className="enquiry-error"/></label>
    </>}
    <button className="button primary" type="submit" disabled={state.submitting}>{state.submitting ? 'Sending enquiry...' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
    <p className="form-note">Your details are sent to Priyanka via <a href="https://formspree.io/" target="_blank" rel="noopener noreferrer">Formspree</a> so she can contact you about your project.</p>
    {state.errors && <div role="alert"><ValidationError errors={state.errors} className="enquiry-error"/><p className="form-note">Please check your details and try again. You can also call <a href="tel:9432497485">9432497485</a>.</p></div>}
  </form>
}
