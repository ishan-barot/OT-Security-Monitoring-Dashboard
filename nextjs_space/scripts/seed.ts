
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('starting database seed...');

  // clear existing data first
  await prisma.alert.deleteMany();
  await prisma.device.deleteMany();
  await prisma.detectionRule.deleteMany();
  await prisma.complianceItem.deleteMany();

  // create realistic ot devices
  const devices = await prisma.device.createMany({
    data: [
      {
        name: 'PLC-REACTOR-01',
        deviceType: 'PLC',
        ipAddress: '10.20.1.15',
        zone: 'Safety Systems',
        status: 'online',
        cpuUsage: 34.2,
        memoryUsage: 52.1,
        networkTraffic: 145.3,
        protocol: 'Modbus TCP',
        lastSeen: new Date(),
        vendor: 'Siemens',
        model: 'S7-1500',
        firmwareVersion: '2.9.3'
      },
      {
        name: 'RTU-PUMP-STATION-3',
        deviceType: 'RTU',
        ipAddress: '10.20.2.42',
        zone: 'OT Network',
        status: 'online',
        cpuUsage: 28.5,
        memoryUsage: 41.3,
        networkTraffic: 89.2,
        protocol: 'DNP3',
        lastSeen: new Date(Date.now() - 120000),
        vendor: 'Schneider Electric',
        model: 'T300',
        firmwareVersion: '3.2.1'
      },
      {
        name: 'HMI-CONTROL-ROOM-A',
        deviceType: 'HMI',
        ipAddress: '10.20.3.10',
        zone: 'OT Network',
        status: 'warning',
        cpuUsage: 67.8,
        memoryUsage: 78.4,
        networkTraffic: 234.7,
        protocol: 'OPC-UA',
        lastSeen: new Date(Date.now() - 30000),
        vendor: 'Rockwell Automation',
        model: 'FactoryTalk View',
        firmwareVersion: '12.0.1'
      },
      {
        name: 'PLC-TURBINE-CTRL-02',
        deviceType: 'PLC',
        ipAddress: '10.20.1.18',
        zone: 'Safety Systems',
        status: 'online',
        cpuUsage: 41.2,
        memoryUsage: 58.9,
        networkTraffic: 167.4,
        protocol: 'Modbus TCP',
        lastSeen: new Date(),
        vendor: 'Allen-Bradley',
        model: 'ControlLogix 5580',
        firmwareVersion: '32.011'
      },
      {
        name: 'RTU-SUBSTATION-07',
        deviceType: 'RTU',
        ipAddress: '10.20.2.78',
        zone: 'OT Network',
        status: 'online',
        cpuUsage: 22.1,
        memoryUsage: 35.7,
        networkTraffic: 72.8,
        protocol: 'IEC 61850',
        lastSeen: new Date(Date.now() - 90000),
        vendor: 'GE Grid Solutions',
        model: 'D400',
        firmwareVersion: '4.1.2'
      },
      {
        name: 'HMI-OPERATOR-STATION-B',
        deviceType: 'HMI',
        ipAddress: '10.20.3.12',
        zone: 'OT Network',
        status: 'online',
        cpuUsage: 45.3,
        memoryUsage: 61.2,
        networkTraffic: 198.5,
        protocol: 'OPC-UA',
        lastSeen: new Date(),
        vendor: 'Wonderware',
        model: 'InTouch 2020',
        firmwareVersion: '2020.1'
      },
      {
        name: 'PLC-COOLING-SYSTEM-04',
        deviceType: 'PLC',
        ipAddress: '10.20.1.23',
        zone: 'Safety Systems',
        status: 'critical',
        cpuUsage: 89.4,
        memoryUsage: 91.2,
        networkTraffic: 312.6,
        protocol: 'Modbus TCP',
        lastSeen: new Date(Date.now() - 300000),
        vendor: 'Siemens',
        model: 'S7-1200',
        firmwareVersion: '4.2.1'
      },
      {
        name: 'EWS-ENGINEERING-01',
        deviceType: 'Engineering Workstation',
        ipAddress: '10.20.4.5',
        zone: 'DMZ',
        status: 'online',
        cpuUsage: 52.7,
        memoryUsage: 68.3,
        networkTraffic: 421.9,
        protocol: 'Multiple',
        lastSeen: new Date(),
        vendor: 'Dell',
        model: 'Precision 5820',
        firmwareVersion: 'Windows 10 21H2'
      },
      {
        name: 'RTU-PIPELINE-MONITOR-12',
        deviceType: 'RTU',
        ipAddress: '10.20.2.91',
        zone: 'OT Network',
        status: 'online',
        cpuUsage: 31.8,
        memoryUsage: 44.6,
        networkTraffic: 102.3,
        protocol: 'DNP3',
        lastSeen: new Date(Date.now() - 180000),
        vendor: 'Emerson',
        model: 'ROC800',
        firmwareVersion: '4.0.5'
      },
      {
        name: 'PLC-CONVEYOR-CTRL-08',
        deviceType: 'PLC',
        ipAddress: '10.20.1.34',
        zone: 'OT Network',
        status: 'online',
        cpuUsage: 38.9,
        memoryUsage: 47.2,
        networkTraffic: 134.8,
        protocol: 'EtherNet/IP',
        lastSeen: new Date(),
        vendor: 'Allen-Bradley',
        model: 'CompactLogix 5370',
        firmwareVersion: '31.011'
      },
      {
        name: 'HMI-SCADA-SERVER-01',
        deviceType: 'SCADA Server',
        ipAddress: '10.20.3.5',
        zone: 'DMZ',
        status: 'online',
        cpuUsage: 58.2,
        memoryUsage: 72.8,
        networkTraffic: 567.4,
        protocol: 'OPC-UA',
        lastSeen: new Date(),
        vendor: 'Siemens',
        model: 'WinCC OA',
        firmwareVersion: '3.18'
      },
      {
        name: 'RTU-WATER-TREATMENT-06',
        deviceType: 'RTU',
        ipAddress: '10.20.2.55',
        zone: 'OT Network',
        status: 'warning',
        cpuUsage: 71.3,
        memoryUsage: 82.1,
        networkTraffic: 245.7,
        protocol: 'Modbus RTU',
        lastSeen: new Date(Date.now() - 240000),
        vendor: 'Schneider Electric',
        model: 'Modicon M580',
        firmwareVersion: '3.10'
      },
      {
        name: 'PLC-VALVE-CONTROL-05',
        deviceType: 'PLC',
        ipAddress: '10.20.1.27',
        zone: 'Safety Systems',
        status: 'online',
        cpuUsage: 29.4,
        memoryUsage: 39.8,
        networkTraffic: 98.3,
        protocol: 'Profinet',
        lastSeen: new Date(),
        vendor: 'Siemens',
        model: 'S7-1500F',
        firmwareVersion: '2.8.1'
      },
      {
        name: 'HMI-MOBILE-OPERATOR-03',
        deviceType: 'HMI',
        ipAddress: '10.20.3.18',
        zone: 'OT Network',
        status: 'offline',
        cpuUsage: 0,
        memoryUsage: 0,
        networkTraffic: 0,
        protocol: 'OPC-UA',
        lastSeen: new Date(Date.now() - 3600000),
        vendor: 'Ignition',
        model: 'Perspective',
        firmwareVersion: '8.1.17'
      },
      {
        name: 'RTU-GAS-DISTRIBUTION-09',
        deviceType: 'RTU',
        ipAddress: '10.20.2.67',
        zone: 'OT Network',
        status: 'online',
        cpuUsage: 26.7,
        memoryUsage: 38.4,
        networkTraffic: 87.6,
        protocol: 'DNP3',
        lastSeen: new Date(Date.now() - 150000),
        vendor: 'Yokogawa',
        model: 'Stardom FCJ',
        firmwareVersion: '6.03.00'
      },
      {
        name: 'PLC-EMERGENCY-SHUTDOWN',
        deviceType: 'Safety PLC',
        ipAddress: '10.20.1.10',
        zone: 'Safety Systems',
        status: 'online',
        cpuUsage: 19.2,
        memoryUsage: 28.5,
        networkTraffic: 45.2,
        protocol: 'Modbus TCP',
        lastSeen: new Date(),
        vendor: 'Triconex',
        model: 'Tricon CX',
        firmwareVersion: '11.3'
      },
      {
        name: 'HISTORIAN-DB-SERVER',
        deviceType: 'Historian',
        ipAddress: '10.20.4.8',
        zone: 'DMZ',
        status: 'online',
        cpuUsage: 48.6,
        memoryUsage: 76.9,
        networkTraffic: 892.4,
        protocol: 'OPC-DA/UA',
        lastSeen: new Date(),
        vendor: 'OSIsoft',
        model: 'PI System',
        firmwareVersion: '2021 SP1'
      },
      {
        name: 'FIREWALL-OT-DMZ',
        deviceType: 'Firewall',
        ipAddress: '10.20.0.1',
        zone: 'DMZ',
        status: 'online',
        cpuUsage: 42.1,
        memoryUsage: 54.3,
        networkTraffic: 1245.8,
        protocol: 'Multiple',
        lastSeen: new Date(),
        vendor: 'Palo Alto Networks',
        model: 'PA-3220',
        firmwareVersion: '10.2.3'
      },
      {
        name: 'PLC-HVAC-CONTROLLER',
        deviceType: 'PLC',
        ipAddress: '10.20.1.45',
        zone: 'OT Network',
        status: 'online',
        cpuUsage: 33.5,
        memoryUsage: 42.7,
        networkTraffic: 112.9,
        protocol: 'BACnet',
        lastSeen: new Date(),
        vendor: 'Johnson Controls',
        model: 'Metasys',
        firmwareVersion: '11.0'
      }
    ]
  });

  console.log(`created ${devices.count} devices`);

  // fetch device ids for alert relations
  const deviceRecords = await prisma.device.findMany();
  const deviceMap = new Map(deviceRecords.map(d => [d.name, d.id]));

  // create diverse security alerts with mitre techniques
  const alerts = await prisma.alert.createMany({
    data: [
      {
        timestamp: new Date(Date.now() - 3600000),
        severity: 'critical',
        title: 'Unauthorized Control Command Detected',
        description: 'unauthorized write command sent to safety plc without proper authentication sequence',
        mitreId: 'T0855',
        mitreTechnique: 'Unauthorized Command Message',
        affectedDevice: 'PLC-REACTOR-01',
        deviceId: deviceMap.get('PLC-REACTOR-01'),
        zone: 'Safety Systems',
        detectionRule: 'Unauthorized Command Sequence Detection',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 7200000),
        severity: 'high',
        title: 'Lateral Movement via SMB',
        description: 'suspicious smb connection from engineering workstation to multiple plcs in rapid succession',
        mitreId: 'T0867',
        mitreTechnique: 'Lateral Tool Transfer',
        affectedDevice: 'EWS-ENGINEERING-01',
        deviceId: deviceMap.get('EWS-ENGINEERING-01'),
        zone: 'DMZ',
        detectionRule: 'Lateral Movement Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 10800000),
        severity: 'critical',
        title: 'Modbus Function Code Anomaly',
        description: 'unusual modbus function code 0x5B detected, not part of normal operations',
        mitreId: 'T0855',
        mitreTechnique: 'Unauthorized Command Message',
        affectedDevice: 'PLC-COOLING-SYSTEM-04',
        deviceId: deviceMap.get('PLC-COOLING-SYSTEM-04'),
        zone: 'Safety Systems',
        detectionRule: 'Protocol Anomaly Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 14400000),
        severity: 'medium',
        title: 'Failed Authentication Attempts',
        description: 'multiple failed login attempts detected from unknown ip 10.20.5.89',
        mitreId: 'T0859',
        mitreTechnique: 'Valid Accounts',
        affectedDevice: 'HMI-CONTROL-ROOM-A',
        deviceId: deviceMap.get('HMI-CONTROL-ROOM-A'),
        zone: 'OT Network',
        detectionRule: 'Failed Authentication Detection',
        status: 'resolved'
      },
      {
        timestamp: new Date(Date.now() - 18000000),
        severity: 'high',
        title: 'Man-in-the-Middle Attack Detected',
        description: 'arp spoofing detected between hmi and plc, potential mitm attack',
        mitreId: 'T0830',
        mitreTechnique: 'Man in the Middle',
        affectedDevice: 'HMI-OPERATOR-STATION-B',
        deviceId: deviceMap.get('HMI-OPERATOR-STATION-B'),
        zone: 'OT Network',
        detectionRule: 'Network Traffic Pattern Analysis',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 21600000),
        severity: 'critical',
        title: 'PLC Logic Modification Detected',
        description: 'unauthorized modification to ladder logic detected in reactor control plc',
        mitreId: 'T0800',
        mitreTechnique: 'Modify Control Logic',
        affectedDevice: 'PLC-REACTOR-01',
        deviceId: deviceMap.get('PLC-REACTOR-01'),
        zone: 'Safety Systems',
        detectionRule: 'Configuration Change Detection',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 25200000),
        severity: 'high',
        title: 'Operating Mode Change Without Authorization',
        description: 'plc switched from run to program mode outside maintenance window',
        mitreId: 'T0858',
        mitreTechnique: 'Change Operating Mode',
        affectedDevice: 'PLC-TURBINE-CTRL-02',
        deviceId: deviceMap.get('PLC-TURBINE-CTRL-02'),
        zone: 'Safety Systems',
        detectionRule: 'Unauthorized Mode Change Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 28800000),
        severity: 'medium',
        title: 'Abnormal DNP3 Traffic Volume',
        description: 'rtu showing 300% increase in dnp3 traffic, possible data exfiltration',
        mitreId: 'T0830',
        mitreTechnique: 'Man in the Middle',
        affectedDevice: 'RTU-PUMP-STATION-3',
        deviceId: deviceMap.get('RTU-PUMP-STATION-3'),
        zone: 'OT Network',
        detectionRule: 'Network Traffic Pattern Analysis',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 32400000),
        severity: 'low',
        title: 'Device Firmware Version Mismatch',
        description: 'detected outdated firmware version with known vulnerabilities',
        mitreId: 'T0883',
        mitreTechnique: 'Internet Accessible Device',
        affectedDevice: 'RTU-SUBSTATION-07',
        deviceId: deviceMap.get('RTU-SUBSTATION-07'),
        zone: 'OT Network',
        detectionRule: 'Configuration Change Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 36000000),
        severity: 'critical',
        title: 'Alarm Suppression Detected',
        description: 'critical alarms for cooling system disabled via unauthorized command',
        mitreId: 'T0878',
        mitreTechnique: 'Alarm Suppression',
        affectedDevice: 'PLC-COOLING-SYSTEM-04',
        deviceId: deviceMap.get('PLC-COOLING-SYSTEM-04'),
        zone: 'Safety Systems',
        detectionRule: 'Alarm Status Monitoring',
        status: 'critical'
      },
      {
        timestamp: new Date(Date.now() - 39600000),
        severity: 'medium',
        title: 'Unusual OPC-UA Subscription Pattern',
        description: 'new opc-ua client subscribed to all tags including sensitive safety parameters',
        mitreId: 'T0868',
        mitreTechnique: 'Detect Operating Mode',
        affectedDevice: 'HMI-SCADA-SERVER-01',
        deviceId: deviceMap.get('HMI-SCADA-SERVER-01'),
        zone: 'DMZ',
        detectionRule: 'Protocol Anomaly Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 43200000),
        severity: 'high',
        title: 'Brute Force Attack on HMI',
        description: 'detected 247 failed login attempts within 5 minutes from external ip',
        mitreId: 'T0859',
        mitreTechnique: 'Valid Accounts',
        affectedDevice: 'HMI-CONTROL-ROOM-A',
        deviceId: deviceMap.get('HMI-CONTROL-ROOM-A'),
        zone: 'OT Network',
        detectionRule: 'Failed Authentication Detection',
        status: 'resolved'
      },
      {
        timestamp: new Date(Date.now() - 46800000),
        severity: 'critical',
        title: 'Safety Interlock Bypass Attempt',
        description: 'detected attempt to bypass emergency shutdown interlock via modbus write',
        mitreId: 'T0831',
        mitreTechnique: 'Manipulation of Control',
        affectedDevice: 'PLC-EMERGENCY-SHUTDOWN',
        deviceId: deviceMap.get('PLC-EMERGENCY-SHUTDOWN'),
        zone: 'Safety Systems',
        detectionRule: 'Unauthorized Command Sequence Detection',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 50400000),
        severity: 'medium',
        title: 'Unauthorized Network Scan',
        description: 'port scanning detected from corporate network targeting ot devices',
        mitreId: 'T0846',
        mitreTechnique: 'Remote System Discovery',
        affectedDevice: 'FIREWALL-OT-DMZ',
        deviceId: deviceMap.get('FIREWALL-OT-DMZ'),
        zone: 'DMZ',
        detectionRule: 'Network Traffic Pattern Analysis',
        status: 'resolved'
      },
      {
        timestamp: new Date(Date.now() - 54000000),
        severity: 'high',
        title: 'Time-Based Anomaly in Control Commands',
        description: 'control commands sent to conveyor plc during non-operational hours',
        mitreId: 'T0855',
        mitreTechnique: 'Unauthorized Command Message',
        affectedDevice: 'PLC-CONVEYOR-CTRL-08',
        deviceId: deviceMap.get('PLC-CONVEYOR-CTRL-08'),
        zone: 'OT Network',
        detectionRule: 'Time-Based Anomaly Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 57600000),
        severity: 'medium',
        title: 'Configuration Backup File Access',
        description: 'unauthorized read access to plc configuration backup files on historian',
        mitreId: 'T0877',
        mitreTechnique: 'Data from Local System',
        affectedDevice: 'HISTORIAN-DB-SERVER',
        deviceId: deviceMap.get('HISTORIAN-DB-SERVER'),
        zone: 'DMZ',
        detectionRule: 'Configuration Change Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 61200000),
        severity: 'low',
        title: 'Excessive RTU Polling Rate',
        description: 'rtu polling rate increased to 10x normal, possible reconnaissance',
        mitreId: 'T0840',
        mitreTechnique: 'Network Connection Enumeration',
        affectedDevice: 'RTU-PIPELINE-MONITOR-12',
        deviceId: deviceMap.get('RTU-PIPELINE-MONITOR-12'),
        zone: 'OT Network',
        detectionRule: 'Protocol Anomaly Detection',
        status: 'resolved'
      },
      {
        timestamp: new Date(Date.now() - 64800000),
        severity: 'critical',
        title: 'Unauthorized Engineering Software Connection',
        description: 'unknown engineering software connected to valve control plc',
        mitreId: 'T0858',
        mitreTechnique: 'Change Operating Mode',
        affectedDevice: 'PLC-VALVE-CONTROL-05',
        deviceId: deviceMap.get('PLC-VALVE-CONTROL-05'),
        zone: 'Safety Systems',
        detectionRule: 'Unauthorized Command Sequence Detection',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 68400000),
        severity: 'high',
        title: 'Suspicious Network Traffic to External IP',
        description: 'scada server initiated connection to external ip address not in whitelist',
        mitreId: 'T0884',
        mitreTechnique: 'Connection Proxy',
        affectedDevice: 'HMI-SCADA-SERVER-01',
        deviceId: deviceMap.get('HMI-SCADA-SERVER-01'),
        zone: 'DMZ',
        detectionRule: 'Data Exfiltration Detection',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 72000000),
        severity: 'medium',
        title: 'Privilege Escalation Attempt',
        description: 'operator account attempted to access admin-level functions on hmi',
        mitreId: 'T0890',
        mitreTechnique: 'Exploitation for Privilege Escalation',
        affectedDevice: 'HMI-MOBILE-OPERATOR-03',
        deviceId: deviceMap.get('HMI-MOBILE-OPERATOR-03'),
        zone: 'OT Network',
        detectionRule: 'Failed Authentication Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 75600000),
        severity: 'low',
        title: 'Certificate Validation Warning',
        description: 'tls certificate expired on water treatment rtu',
        mitreId: 'T0883',
        mitreTechnique: 'Internet Accessible Device',
        affectedDevice: 'RTU-WATER-TREATMENT-06',
        deviceId: deviceMap.get('RTU-WATER-TREATMENT-06'),
        zone: 'OT Network',
        detectionRule: 'Configuration Change Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 79200000),
        severity: 'critical',
        title: 'Process Value Manipulation Detected',
        description: 'temperature setpoint forcefully changed beyond safe operating limits',
        mitreId: 'T0831',
        mitreTechnique: 'Manipulation of Control',
        affectedDevice: 'PLC-REACTOR-01',
        deviceId: deviceMap.get('PLC-REACTOR-01'),
        zone: 'Safety Systems',
        detectionRule: 'Unauthorized Command Sequence Detection',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 82800000),
        severity: 'high',
        title: 'Modbus Exception Response Pattern',
        description: 'repeated modbus exception responses indicating possible reconnaissance',
        mitreId: 'T0842',
        mitreTechnique: 'Network Sniffing',
        affectedDevice: 'PLC-HVAC-CONTROLLER',
        deviceId: deviceMap.get('PLC-HVAC-CONTROLLER'),
        zone: 'OT Network',
        detectionRule: 'Protocol Anomaly Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 86400000),
        severity: 'medium',
        title: 'Unusual Database Query Pattern',
        description: 'historian database showing bulk data extraction queries during off-hours',
        mitreId: 'T0877',
        mitreTechnique: 'Data from Local System',
        affectedDevice: 'HISTORIAN-DB-SERVER',
        deviceId: deviceMap.get('HISTORIAN-DB-SERVER'),
        zone: 'DMZ',
        detectionRule: 'Data Exfiltration Detection',
        status: 'resolved'
      },
      {
        timestamp: new Date(Date.now() - 90000000),
        severity: 'critical',
        title: 'Firmware Downgrade Attempt',
        description: 'attempt to flash older vulnerable firmware version to gas distribution rtu',
        mitreId: 'T0873',
        mitreTechnique: 'Project File Infection',
        affectedDevice: 'RTU-GAS-DISTRIBUTION-09',
        deviceId: deviceMap.get('RTU-GAS-DISTRIBUTION-09'),
        zone: 'OT Network',
        detectionRule: 'Configuration Change Detection',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 93600000),
        severity: 'high',
        title: 'Unauthorized Tag Write Operation',
        description: 'write operation to read-only tags detected on emergency shutdown system',
        mitreId: 'T0855',
        mitreTechnique: 'Unauthorized Command Message',
        affectedDevice: 'PLC-EMERGENCY-SHUTDOWN',
        deviceId: deviceMap.get('PLC-EMERGENCY-SHUTDOWN'),
        zone: 'Safety Systems',
        detectionRule: 'Unauthorized Command Sequence Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 97200000),
        severity: 'medium',
        title: 'Network Segmentation Violation',
        description: 'detected direct communication between corporate and safety systems zones',
        mitreId: 'T0867',
        mitreTechnique: 'Lateral Tool Transfer',
        affectedDevice: 'FIREWALL-OT-DMZ',
        deviceId: deviceMap.get('FIREWALL-OT-DMZ'),
        zone: 'DMZ',
        detectionRule: 'Lateral Movement Detection',
        status: 'resolved'
      },
      {
        timestamp: new Date(Date.now() - 100800000),
        severity: 'low',
        title: 'Default Credentials Detected',
        description: 'device still using default manufacturer credentials found during audit',
        mitreId: 'T0859',
        mitreTechnique: 'Valid Accounts',
        affectedDevice: 'RTU-SUBSTATION-07',
        deviceId: deviceMap.get('RTU-SUBSTATION-07'),
        zone: 'OT Network',
        detectionRule: 'Failed Authentication Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 104400000),
        severity: 'critical',
        title: 'Coordinated Multi-Device Attack',
        description: 'synchronized unauthorized commands sent to multiple safety plcs',
        mitreId: 'T0831',
        mitreTechnique: 'Manipulation of Control',
        affectedDevice: 'PLC-REACTOR-01',
        deviceId: deviceMap.get('PLC-REACTOR-01'),
        zone: 'Safety Systems',
        detectionRule: 'Unauthorized Command Sequence Detection',
        status: 'critical'
      },
      {
        timestamp: new Date(Date.now() - 108000000),
        severity: 'high',
        title: 'Abnormal Memory Usage Pattern',
        description: 'plc showing unusual memory allocation pattern, possible malware',
        mitreId: 'T0873',
        mitreTechnique: 'Project File Infection',
        affectedDevice: 'PLC-COOLING-SYSTEM-04',
        deviceId: deviceMap.get('PLC-COOLING-SYSTEM-04'),
        zone: 'Safety Systems',
        detectionRule: 'Protocol Anomaly Detection',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 111600000),
        severity: 'medium',
        title: 'USB Device Connection Detected',
        description: 'unauthorized usb device connected to engineering workstation',
        mitreId: 'T0847',
        mitreTechnique: 'Replication Through Removable Media',
        affectedDevice: 'EWS-ENGINEERING-01',
        deviceId: deviceMap.get('EWS-ENGINEERING-01'),
        zone: 'DMZ',
        detectionRule: 'Lateral Movement Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 115200000),
        severity: 'low',
        title: 'Session Timeout Violation',
        description: 'hmi session remained active beyond configured timeout period',
        mitreId: 'T0859',
        mitreTechnique: 'Valid Accounts',
        affectedDevice: 'HMI-OPERATOR-STATION-B',
        deviceId: deviceMap.get('HMI-OPERATOR-STATION-B'),
        zone: 'OT Network',
        detectionRule: 'Failed Authentication Detection',
        status: 'resolved'
      },
      {
        timestamp: new Date(Date.now() - 118800000),
        severity: 'critical',
        title: 'Safety System Communication Loss',
        description: 'critical communication loss between reactor plc and emergency shutdown system',
        mitreId: 'T0826',
        mitreTechnique: 'Loss of View',
        affectedDevice: 'PLC-REACTOR-01',
        deviceId: deviceMap.get('PLC-REACTOR-01'),
        zone: 'Safety Systems',
        detectionRule: 'Network Traffic Pattern Analysis',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 122400000),
        severity: 'high',
        title: 'ICS Protocol Fuzzing Detected',
        description: 'malformed packets sent to test plc input validation, likely attack preparation',
        mitreId: 'T0866',
        mitreTechnique: 'Exploitation of Remote Services',
        affectedDevice: 'PLC-TURBINE-CTRL-02',
        deviceId: deviceMap.get('PLC-TURBINE-CTRL-02'),
        zone: 'Safety Systems',
        detectionRule: 'Protocol Anomaly Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 126000000),
        severity: 'medium',
        title: 'Rogue DHCP Server Detected',
        description: 'unauthorized dhcp server detected on ot network segment',
        mitreId: 'T0830',
        mitreTechnique: 'Man in the Middle',
        affectedDevice: 'FIREWALL-OT-DMZ',
        deviceId: deviceMap.get('FIREWALL-OT-DMZ'),
        zone: 'DMZ',
        detectionRule: 'Network Traffic Pattern Analysis',
        status: 'resolved'
      },
      {
        timestamp: new Date(Date.now() - 129600000),
        severity: 'critical',
        title: 'Controller Key Switch Override',
        description: 'software-based override of physical key switch safety control detected',
        mitreId: 'T0858',
        mitreTechnique: 'Change Operating Mode',
        affectedDevice: 'PLC-VALVE-CONTROL-05',
        deviceId: deviceMap.get('PLC-VALVE-CONTROL-05'),
        zone: 'Safety Systems',
        detectionRule: 'Unauthorized Mode Change Detection',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 133200000),
        severity: 'high',
        title: 'Historian Data Tampering',
        description: 'historical process data modified to hide evidence of anomalies',
        mitreId: 'T0870',
        mitreTechnique: 'Detect Program State',
        affectedDevice: 'HISTORIAN-DB-SERVER',
        deviceId: deviceMap.get('HISTORIAN-DB-SERVER'),
        zone: 'DMZ',
        detectionRule: 'Configuration Change Detection',
        status: 'investigating'
      },
      {
        timestamp: new Date(Date.now() - 136800000),
        severity: 'medium',
        title: 'Network Baseline Deviation',
        description: 'network traffic pattern significantly deviates from established baseline',
        mitreId: 'T0842',
        mitreTechnique: 'Network Sniffing',
        affectedDevice: 'FIREWALL-OT-DMZ',
        deviceId: deviceMap.get('FIREWALL-OT-DMZ'),
        zone: 'DMZ',
        detectionRule: 'Network Traffic Pattern Analysis',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 140400000),
        severity: 'low',
        title: 'Unused Protocol Service Active',
        description: 'telnet service found active on rtu despite being disabled in policy',
        mitreId: 'T0883',
        mitreTechnique: 'Internet Accessible Device',
        affectedDevice: 'RTU-WATER-TREATMENT-06',
        deviceId: deviceMap.get('RTU-WATER-TREATMENT-06'),
        zone: 'OT Network',
        detectionRule: 'Configuration Change Detection',
        status: 'open'
      },
      {
        timestamp: new Date(Date.now() - 144000000),
        severity: 'critical',
        title: 'Mass Configuration Export',
        description: 'configuration files for all plcs downloaded in bulk by unknown source',
        mitreId: 'T0877',
        mitreTechnique: 'Data from Local System',
        affectedDevice: 'EWS-ENGINEERING-01',
        deviceId: deviceMap.get('EWS-ENGINEERING-01'),
        zone: 'DMZ',
        detectionRule: 'Data Exfiltration Detection',
        status: 'investigating'
      }
    ]
  });

  console.log(`created ${alerts.count} security alerts`);

  // create detection rules
  const rules = await prisma.detectionRule.createMany({
    data: [
      {
        name: 'Lateral Movement Detection',
        description: 'monitors for suspicious smb/rdp connections between ot devices or from corporate to ot networks',
        mitreId: 'T0867',
        mitreTechnique: 'Lateral Tool Transfer',
        detectionLogic: 'trigger when device initiates connections to >3 other devices within 60 seconds, or when corporate network connects to safety systems zone',
        severity: 'high',
        exampleAlert: 'engineering workstation established connections to 7 plcs in 45 seconds',
        isActive: true
      },
      {
        name: 'Unauthorized Command Sequence Detection',
        description: 'identifies control commands sent without proper authentication or authorization sequences',
        mitreId: 'T0855',
        mitreTechnique: 'Unauthorized Command Message',
        detectionLogic: 'trigger when write commands occur without preceding authentication handshake, or commands sent outside authorized time windows',
        severity: 'critical',
        exampleAlert: 'modbus write command to safety plc without prior login sequence',
        isActive: true
      },
      {
        name: 'Protocol Anomaly Detection',
        description: 'detects unusual protocol behavior including malformed packets, invalid function codes, or unexpected sequences',
        mitreId: 'T0842',
        mitreTechnique: 'Network Sniffing',
        detectionLogic: 'trigger on unknown modbus function codes, dnp3 packets with invalid crc, or opc-ua messages outside specification',
        severity: 'medium',
        exampleAlert: 'detected modbus function code 0x7F which is not in standard specification',
        isActive: true
      },
      {
        name: 'Network Traffic Pattern Analysis',
        description: 'establishes baseline traffic patterns and alerts on significant deviations indicating reconnaissance or exfiltration',
        mitreId: 'T0830',
        mitreTechnique: 'Man in the Middle',
        detectionLogic: 'calculate rolling 7-day baseline per device, trigger when traffic volume >200% or new destination IPs appear',
        severity: 'high',
        exampleAlert: 'rtu network traffic increased to 340% of baseline, new external IP contacted',
        isActive: true
      },
      {
        name: 'Failed Authentication Detection',
        description: 'tracks failed login attempts and identifies potential brute force or credential stuffing attacks',
        mitreId: 'T0859',
        mitreTechnique: 'Valid Accounts',
        detectionLogic: 'trigger on >5 failed attempts within 5 minutes, or >20 failed attempts in 24 hours from same source',
        severity: 'medium',
        exampleAlert: '47 failed login attempts from ip 10.50.3.22 in 8 minutes',
        isActive: true
      },
      {
        name: 'Configuration Change Detection',
        description: 'monitors for unauthorized modifications to device configurations, ladder logic, or firmware',
        mitreId: 'T0800',
        mitreTechnique: 'Modify Control Logic',
        detectionLogic: 'trigger on plc mode changes, logic downloads, firmware updates, or configuration file modifications outside maintenance windows',
        severity: 'critical',
        exampleAlert: 'ladder logic modified on reactor control plc at 2:34am outside maintenance schedule',
        isActive: true
      },
      {
        name: 'Time-Based Anomaly Detection',
        description: 'identifies operations occurring during unusual time periods when no activity should occur',
        mitreId: 'T0858',
        mitreTechnique: 'Change Operating Mode',
        detectionLogic: 'trigger when control commands, configuration changes, or user logins occur outside defined operational hours',
        severity: 'high',
        exampleAlert: 'control commands sent to conveyor system at 3:15am on sunday',
        isActive: true
      },
      {
        name: 'Data Exfiltration Detection',
        description: 'monitors for bulk data extraction or connections to unauthorized external destinations',
        mitreId: 'T0877',
        mitreTechnique: 'Data from Local System',
        detectionLogic: 'trigger on bulk database queries, large file transfers to external ips, or access to backup/archive files by non-admin accounts',
        severity: 'high',
        exampleAlert: 'historian database bulk export query executed by operator account, 2.4gb transferred',
        isActive: true
      }
    ]
  });

  console.log(`created ${rules.count} detection rules`);

  // create nist 800-82 compliance items
  const compliance = await prisma.complianceItem.createMany({
    data: [
      {
        controlId: 'AC-2',
        category: 'Access Control',
        description: 'account management - ensure proper user account provisioning and deprovisioning',
        status: 'compliant',
        notes: 'automated provisioning system in place, quarterly access reviews conducted',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'AC-3',
        category: 'Access Control',
        description: 'access enforcement - enforce approved authorizations for logical access',
        status: 'compliant',
        notes: 'role-based access control implemented across all ot systems',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'AC-6',
        category: 'Access Control',
        description: 'least privilege - employ principle of least privilege for all accounts',
        status: 'partial',
        notes: 'implemented for 85% of accounts, legacy systems require additional work',
        lastAssessed: new Date(Date.now() - 1296000000)
      },
      {
        controlId: 'AC-17',
        category: 'Access Control',
        description: 'remote access - authorize and monitor remote access sessions',
        status: 'compliant',
        notes: 'vpn with mfa required, all sessions logged and monitored',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'AU-2',
        category: 'Audit and Accountability',
        description: 'audit events - ensure system audits capture security-relevant events',
        status: 'compliant',
        notes: 'comprehensive logging enabled, events forwarded to siem',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'AU-6',
        category: 'Audit and Accountability',
        description: 'audit review - review and analyze audit records for indicators of inappropriate activity',
        status: 'compliant',
        notes: 'daily automated review plus weekly manual analysis by security team',
        lastAssessed: new Date(Date.now() - 1296000000)
      },
      {
        controlId: 'AU-9',
        category: 'Audit and Accountability',
        description: 'protection of audit information - protect audit logs from unauthorized access and modification',
        status: 'compliant',
        notes: 'audit logs stored on separate hardened system with append-only access',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'CM-2',
        category: 'Configuration Management',
        description: 'baseline configuration - maintain baseline configurations for all systems',
        status: 'partial',
        notes: 'baselines documented for critical systems, remaining 30% in progress',
        lastAssessed: new Date(Date.now() - 1296000000)
      },
      {
        controlId: 'CM-3',
        category: 'Configuration Management',
        description: 'configuration change control - authorize and document changes to baseline',
        status: 'compliant',
        notes: 'change management process with approvals and rollback procedures',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'CM-7',
        category: 'Configuration Management',
        description: 'least functionality - configure systems to provide only essential capabilities',
        status: 'partial',
        notes: 'unnecessary services disabled on 75% of devices, older rtus need updates',
        lastAssessed: new Date(Date.now() - 1296000000)
      },
      {
        controlId: 'IA-2',
        category: 'Identification and Authentication',
        description: 'identification and authentication - uniquely identify and authenticate users',
        status: 'compliant',
        notes: 'unique accounts for all users, no shared credentials',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'IA-5',
        category: 'Identification and Authentication',
        description: 'authenticator management - manage authenticators securely',
        status: 'partial',
        notes: 'password policy enforced, some legacy devices still use default creds',
        lastAssessed: new Date(Date.now() - 1296000000)
      },
      {
        controlId: 'IR-4',
        category: 'Incident Response',
        description: 'incident handling - implement incident response capability',
        status: 'compliant',
        notes: 'documented ir procedures, quarterly tabletop exercises conducted',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'IR-6',
        category: 'Incident Response',
        description: 'incident reporting - require personnel to report suspected incidents',
        status: 'compliant',
        notes: 'clear reporting procedures, mandatory security awareness training',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'RA-5',
        category: 'Risk Assessment',
        description: 'vulnerability scanning - scan for vulnerabilities in systems and applications',
        status: 'compliant',
        notes: 'monthly vulnerability scans, passive monitoring for ot devices',
        lastAssessed: new Date(Date.now() - 1296000000)
      },
      {
        controlId: 'SC-7',
        category: 'System and Communications Protection',
        description: 'boundary protection - monitor and control communications at external boundaries',
        status: 'compliant',
        notes: 'industrial firewalls deployed, dmz architecture implemented',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'SC-8',
        category: 'System and Communications Protection',
        description: 'transmission confidentiality - protect confidentiality of transmitted information',
        status: 'partial',
        notes: 'encryption implemented for 60% of ot protocols, modbus tcp still unencrypted',
        lastAssessed: new Date(Date.now() - 1296000000)
      },
      {
        controlId: 'SC-20',
        category: 'System and Communications Protection',
        description: 'secure name resolution - provide data origin authentication for dns',
        status: 'non-compliant',
        notes: 'dnssec not yet implemented, planned for next quarter',
        lastAssessed: new Date(Date.now() - 1296000000)
      },
      {
        controlId: 'SI-2',
        category: 'System and Information Integrity',
        description: 'flaw remediation - identify and correct information system flaws',
        status: 'partial',
        notes: 'patch management process in place, testing delays for critical systems',
        lastAssessed: new Date(Date.now() - 1296000000)
      },
      {
        controlId: 'SI-3',
        category: 'System and Information Integrity',
        description: 'malicious code protection - implement malware protection mechanisms',
        status: 'compliant',
        notes: 'endpoint protection on workstations, application whitelisting on hmis',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'SI-4',
        category: 'System and Information Integrity',
        description: 'information system monitoring - monitor systems to detect attacks and indicators',
        status: 'compliant',
        notes: 'ics-aware ids deployed, 24/7 soc monitoring',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'SI-7',
        category: 'System and Information Integrity',
        description: 'software integrity - employ integrity verification tools',
        status: 'partial',
        notes: 'file integrity monitoring on critical systems, expanding coverage',
        lastAssessed: new Date(Date.now() - 1296000000)
      },
      {
        controlId: 'CP-2',
        category: 'Contingency Planning',
        description: 'contingency plan - develop and maintain contingency plans',
        status: 'compliant',
        notes: 'documented recovery procedures, tested annually',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'CP-9',
        category: 'Contingency Planning',
        description: 'information system backup - conduct backups of critical information',
        status: 'compliant',
        notes: 'automated daily backups, offsite storage, monthly restore tests',
        lastAssessed: new Date(Date.now() - 2592000000)
      },
      {
        controlId: 'PE-3',
        category: 'Physical Protection',
        description: 'physical access control - enforce physical access authorizations',
        status: 'compliant',
        notes: 'badge access system, security cameras, visitor logs maintained',
        lastAssessed: new Date(Date.now() - 2592000000)
      }
    ]
  });

  console.log(`created ${compliance.count} compliance items`);
  console.log('database seeding completed successfully');
}

main()
  .catch((e) => {
    console.error('error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
