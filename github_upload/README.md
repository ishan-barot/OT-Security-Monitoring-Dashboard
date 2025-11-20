
# OT Security Monitoring Dashboard

A professional-grade security operations center (SOC) dashboard for Industrial Control Systems (ICS) and SCADA environments. This application provides comprehensive monitoring, threat detection, and compliance management for operational technology networks.

## Author

**Ishan Barot**

## Project Overview

This full-stack web application simulates a real-world OT security monitoring environment with capabilities including:

- **ICS/SCADA Security**: Deep understanding of industrial protocols (Modbus, DNP3, OPC-UA, Profinet, EtherNet/IP)
- **Threat Detection**: Implementation of 8 detection rules covering various attack vectors
- **MITRE ATT&CK for ICS**: Mapping of security events to ICS-specific tactics and techniques
- **Compliance Standards**: NIST 800-82 Rev 2 and IEC 62443 security level tracking
- **Network Architecture**: Purdue model implementation with proper zone segmentation

## Features

### 1. Real-Time Device Monitoring
- **19 simulated OT devices** including PLCs, RTUs, HMIs, SCADA servers, and safety systems
- Live status indicators (online, warning, critical, offline)
- Key performance metrics: CPU usage, memory utilization, network traffic
- Protocol information and vendor details
- Searchable and filterable device inventory

### 2. Security Alert Management
- **40 pre-loaded security events** representing realistic attack scenarios
- Severity classification (critical, high, medium, low)
- MITRE ATT&CK for ICS technique mapping (T0831, T0855, T0830, T0867, T0878, etc.)
- Detailed alert descriptions and affected device tracking
- Filterable by severity and technique

### 3. Network Topology Visualization
- Four-tier network architecture (Corporate, DMZ, OT Network, Safety Systems)
- VLAN segmentation details
- Firewall rules and access control policies
- Device placement in security zones
- Zero-trust architecture principles

### 4. Detection Rules Engine
- **8 comprehensive detection rules**:
  - Lateral Movement Detection
  - Unauthorized Command Sequence Detection
  - Protocol Anomaly Detection
  - Network Traffic Pattern Analysis
  - Failed Authentication Detection
  - Configuration Change Detection
  - Time-Based Anomaly Detection
  - Data Exfiltration Detection
- MITRE technique mapping for each rule
- Detection logic and example alerts

### 5. Compliance Management
- **25 NIST 800-82 controls** across 8 categories:
  - Access Control (AC)
  - Audit and Accountability (AU)
  - Configuration Management (CM)
  - Identification and Authentication (IA)
  - Incident Response (IR)
  - Risk Assessment (RA)
  - System and Communications Protection (SC)
  - System and Information Integrity (SI)
  - Contingency Planning (CP)
  - Physical Protection (PE)
- Real-time compliance scoring
- IEC 62443 security level assessment
- Exportable compliance reports

## Technology Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Framer Motion** for animations (ready to implement)

### Backend
- **Next.js API Routes** for serverless functions
- **Prisma ORM** for type-safe database queries
- **PostgreSQL** for persistent data storage

### UI Components
- Custom-built components with shadcn/ui base
- Professional dark theme optimized for SOC environments
- Responsive design for all screen sizes

## Installation & Setup

### Prerequisites
- Node.js 18+ and yarn
- PostgreSQL database (provided automatically)

### Quick Start

1. **Clone and navigate to the project**
```bash
cd /home/ubuntu/ot_security_dashboard/nextjs_space
```

2. **Install dependencies**
```bash
yarn install
```

3. **Database setup**
The database is already configured with connection string in `.env` file.

4. **Generate Prisma client and push schema**
```bash
npx prisma generate
npx prisma db push
```

5. **Seed the database with realistic OT data**
```bash
yarn prisma db seed
```

6. **Run the development server**
```bash
yarn dev
```

7. **Open your browser**
Navigate to `http://localhost:3000`

## Architecture

### Database Schema

#### Device Model
- Stores OT device information (PLCs, RTUs, HMIs, etc.)
- Tracks real-time metrics (CPU, memory, network traffic)
- Protocol and vendor information
- Network zone assignment

#### Alert Model
- Security event records with timestamps
- Severity levels and MITRE technique mapping
- Device relationships and zone information
- Status tracking (open, investigating, resolved)

#### DetectionRule Model
- Configured detection rules
- MITRE ATT&CK technique mapping
- Detection logic and example scenarios
- Active/inactive status

#### ComplianceItem Model
- NIST 800-82 control tracking
- Category organization
- Compliance status (compliant, partial, non-compliant)
- Assessment timestamps and notes

### Project Structure

```
nextjs_space/
├── app/
│   ├── api/                    # api endpoints
│   │   ├── devices/           # device data endpoint
│   │   ├── alerts/            # alerts with filtering
│   │   ├── detection-rules/   # detection rules data
│   │   ├── compliance/        # compliance items
│   │   └── stats/             # aggregated statistics
│   ├── detection-rules/       # detection rules page
│   ├── compliance/            # compliance page
│   ├── globals.css            # global styles
│   ├── layout.tsx             # root layout
│   └── page.tsx               # home dashboard
├── components/
│   ├── ui/                    # reusable ui components
│   ├── sidebar.tsx            # navigation sidebar
│   ├── dashboard-tabs.tsx     # tabbed interface
│   ├── monitor-tab.tsx        # device monitoring
│   ├── alerts-tab.tsx         # alert management
│   ├── network-tab.tsx        # network topology
│   ├── device-card.tsx        # device display card
│   ├── alert-item.tsx         # alert item display
│   ├── stats-overview.tsx     # stats cards
│   ├── detection-rules-content.tsx
│   └── compliance-content.tsx
├── prisma/
│   └── schema.prisma          # database schema
├── scripts/
│   └── seed.ts                # database seeding script
└── lib/
    ├── db.ts                  # prisma client
    ├── utils.ts               # utility functions
    └── types.ts               # type definitions
```

## Design Philosophy

### Professional SOC Aesthetic
- Dark theme optimized for extended monitoring sessions
- High-contrast color palette for quick status identification
- Subtle gradients and shadows for depth
- Responsive grid layouts for information density

### Security-First UI/UX
- Color-coded severity indicators (red for critical, orange for high, yellow for medium, blue for low)
- Clear MITRE technique badges for threat classification
- Intuitive filtering and search capabilities
- Real-time status updates with visual feedback

### Code Quality
- All comments written in lowercase, natural human style
- Type-safe TypeScript implementation
- Defensive programming with null checks
- Clean component architecture
- Reusable, modular design patterns

## Security Concepts Demonstrated

### OT Security Knowledge
- Understanding of Purdue model network segmentation
- Knowledge of industrial protocols and their vulnerabilities
- Awareness of ICS-specific attack vectors
- Implementation of defense-in-depth strategies

### MITRE ATT&CK for ICS
- **Initial Access**: Exploitation of remote services
- **Execution**: Unauthorized command messages
- **Persistence**: Modify control logic
- **Lateral Movement**: Lateral tool transfer
- **Collection**: Detect operating mode
- **Impact**: Manipulation of control, alarm suppression

### Compliance Frameworks
- **NIST 800-82**: Guide to ICS security
- **IEC 62443**: Industrial automation and control systems security
- Control implementation and gap analysis
- Continuous compliance monitoring

## Use Cases

This dashboard provides capabilities for:

1. **Security Monitoring**: Real-time threat detection, alert triage, and incident investigation
2. **ICS Security Management**: Monitoring of OT environments with unique security requirements
3. **Compliance Tracking**: Continuous assessment against regulatory frameworks and audit requirements
4. **Network Visualization**: Understanding of network architecture and security controls
5. **Operational Intelligence**: Comprehensive visibility into industrial control systems

## Technical Implementation

This project demonstrates:

- Full-stack web application development
- Database design and ORM usage
- API design and implementation
- Modern React patterns and hooks
- TypeScript for type safety
- Responsive UI/UX design
- Security domain knowledge integration

## Future Enhancements

Potential additions to expand the project:

- Real-time WebSocket connections for live updates
- Historical trend analysis and charting
- Machine learning-based anomaly detection
- Integration with external threat intelligence feeds
- Multi-tenant support for different facilities
- Mobile companion application
- Advanced reporting and export capabilities
- Playbook automation for incident response

## Contributing

Contributions are welcome. Feel free to fork and submit pull requests.

## License

This project is open source and available for educational purposes.

## Contact

**Ishan Barot**

---

**Note**: This is a simulation environment with synthetic data for demonstration purposes. In a production environment, additional security measures, authentication, authorization, and real data integration would be required.
