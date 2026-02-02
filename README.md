
# SPAT Analytics – Frontend

A modern, responsive React-based analytics dashboard for visualizing ticket booking data across multiple bus operators.

The frontend consumes REST analytics APIs exposed by the SPAT Analytics backend and presents actionable insights through clean UI components, tables, and charts.


## Purpose

The frontend enables users to:
- View aggregated booking metrics
- Analyze company-wise performance
- Track booking trends over time
- Filter bookings by date and operator
- Explore detailed booking records

It is designed as a pure presentation layer, keeping all business logic and data processing in the backend.
## Features
- Interactive dashboard with KPIs
- Company-wise performance charts
- Time-series booking trends
- Paginated booking table
- Date & company filters
- CSV upload support (demo ingestion trigger)
- Responsive layout (desktop-first)
- Clean component-based architecture
<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/e8ffd3f1-ac11-4801-9c8a-fad0ffb73e05" width="100%" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/ee60ee15-2b5a-4ee0-a94d-c5607fe3741b" width="100%" />
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/331f966e-2c4b-4068-ab17-6cd5166d0678" width="100%" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/a36cdec4-f7f9-4435-93ab-bbd2432d8c44" width="100%" />
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img src="https://github.com/user-attachments/assets/2fbba65c-6ef5-43cb-82f7-81a7eef190b4" width="80%" />
    </td>
  </tr>
</table>


## Tech Stack
- React (Vite)
- React Router
- Axios – API communication
- Recharts – Data visualization
- Tailwind CSS – UI styling
- Docker & Nginx – Containerized production build
## API Integration

The frontend communicates with the backend using REST APIs such as:
```http
GET /api/dashboard/stats
GET /api/bookings
GET /api/companies
POST /api/upload/bookings
```
Axios is configured with a centralized API service for clean and maintainable requests.
## Authentication (Planned Integration)

Backend already supports JWT-based authentication

Frontend is structured to easily add:
- Login & signup pages
- Token storage
- Auth-protected routes

Currently disabled to keep the demo frictionless
## Run Locally

Clone the project

```bash
  git clone https://github.com/viharpeddagopu/spat-analytics-frontend.git
```

Go to the project directory

```bash
  cd spat-analytics-frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

#### Frontend runs at:
```
http://localhost:5173
```
## Future Enhancements
- JWT-based login & logout
- Role-based UI (Admin / User)
- Real-time updates via WebSockets
- Advanced charts & filters
- Better mobile responsiveness
## Contributing

Contributions are always welcome!

Email: viharpeddagopu@gmail.com

LinkedIn: https://www.linkedin.com/in/viharpeddagopu

