# Contact form setup

The form sends `POST /contact` with `name`, `email`, and `message`. The backend sends the email through SMTP and returns success after the mail server accepts it. The visitor's email becomes the message's Reply-To address.

## Backend configuration

Copy `backend/.env.example` to `backend/.env` and fill in the SMTP settings:

```dotenv
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USERNAME=resend
SMTP_PASSWORD=your_smtp_password
SMTP_FROM_EMAIL=your_verified_sender_address
SMTP_TO_EMAIL=ayushnegiuk@gmail.com
```

Use the host, port, username, and password supplied by your mail provider. Port 465 uses implicit TLS; other ports use STARTTLS. `SMTP_FROM_EMAIL` must be a sender your provider permits. Keep these settings on the backend; no SMTP secrets belong in frontend environment variables.

Install and start the backend from `backend/`:

```sh
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

## Frontend configuration

Start the frontend from `frontend/`:

```sh
npm ci
npm run dev
```

Leave `VITE_API_URL` unset for local development. Vite forwards `/contact` to `http://127.0.0.1:8000`.

For a separately hosted backend, set `VITE_API_URL` to its origin and rebuild the frontend. The form appends `/contact`. The backend must allow the frontend origin through `FRONTEND_URL` or its existing CORS configuration.

With `VITE_API_URL` unset, Vercel forwards `/contact` to the existing Render backend using `frontend/vercel.json`. Docker Compose forwards it through Nginx to the `backend` service. Deploy the updated backend alongside the frontend so email failures produce the correct response.

## Verification

Submit the form with a valid name, email, and message. The button displays a sending state, followed by a confirmation after the SMTP server accepts the message. Check the receiving inbox and spam folder to verify final delivery.

If SMTP is unavailable or credentials are missing, the API returns an error and the form preserves the entered message for retry. Configuration and delivery errors return HTTP 503; invalid fields return HTTP 422. Server responses do not expose SMTP credentials or provider error details.

Run automated checks:

```sh
# From backend/
python -m pytest -q

# From frontend/
npm test -- --run
npm run build
```

Automated tests simulate SMTP and API responses. They do not send external emails.
