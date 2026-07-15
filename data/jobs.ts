const jobs = [
  {
    id: 1,
    title: "Senior Backend Engineer",
    company: "CloudScale Systems",
    location: "Fully Remote",
    salary: "$140,000 - $175,000 USD / Year",
    description:
      "Scale our distributed core payment APIs.",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "PixelCraft Studio",
    location: "Hybrid - New York, NY",
    salary: "$95,000 - $120,000 USD / Year",
    description:
      "Build highly responsive user interfaces for modern web apps.",
  },
  {
    id: 3,
    title: "Mobile App Engineer (iOS)",
    company: "SwiftMotion Fitness",
    location: "Onsite - Austin, TX",
    salary: "$115,000 - $145,000 USD / Year",
    description:
      "Develop next-generation fitness tracking modules for iOS devices.",
  },
  {
    id: 4,
    title: "Embedded Systems Engineer",
    company: "AeroBotix Dynamics",
    location: "Contract - Onsite, Seattle, WA",
    salary: "$85 - $105 USD / Hour",
    description:
      "Write low-level firmware for autonomous commercial delivery drones.",
  },
  {
    id: 5,
    title: "Full Stack Developer",
    company: "EduTech Labs",
    location: "Fully Remote",
    salary: "$100,000 - $130,000 USD / Year",
    description:
      "Maintain and expand features on our virtual learning platform.",
  },
  {
    id: 6,
    title: "Machine Learning Engineer",
    company: "Cortex Intelligence",
    location: "Fully Remote",
    salary: "$160,000 - $200,000 USD / Year",
    description:
      "Fine-tune large language models for enterprise search systems.",
  },
  {
    id: 7,
    title: "Data Analyst",
    company: "FinTrend Analytics",
    location: "Hybrid - Chicago, IL",
    salary: "$80,000 - $105,000 USD / Year",
    description:
      "Generate business intelligence reports to optimize market trading decisions.",
  },
  {
    id: 8,
    title: "Data Engineer",
    company: "StreamVibe Media",
    location: "Fully Remote",
    salary: "$130,000 - $165,000 USD / Year",
    description:
      "Construct scalable real-time ingestion pipelines for user streaming behavior.",
  },
  {
    id: 9,
    title: "Computer Vision Scientist",
    company: "AutoDrive Systems",
    location: "Onsite - San Jose, CA",
    salary: "$170,000 - $220,000 USD / Year",
    description:
      "Advance object detection models for autonomous vehicle navigation.",
  },
  {
    id: 10,
    title: "DevOps Engineer",
    company: "NetShield Global",
    location: "Fully Remote",
    salary: "$125,000 - $155,000 USD / Year",
    description:
      "Automate CI/CD infrastructure deployments across cloud environments.",
  },
  {
    id: 11,
    title: "Site Reliability Engineer (SRE)",
    company: "HyperScale Retail",
    location: "Hybrid - Seattle, WA",
    salary: "$150,000 - $185,000 USD / Year",
    description:
      "Guarantee maximum uptime and latency reduction for e-commerce traffic.",
  },
  {
    id: 12,
    title: "Cloud Architect",
    company: "Summit Tech Consulting",
    location: "Fully Remote",
    salary: "$180,000 - $230,000 USD / Year",
    description:
      "Blueprint legacy system migrations to secure hybrid-cloud structures.",
  },
  {
    id: 13,
    title: "Penetration Tester (Ethical Hacker)",
    company: "CyberDefend Inc",
    location: "Contract - Hybrid - Washington, D.C.",
    salary: "$90 - $120 USD / Hour",
    description:
      "Conduct deep vulnerability assessments and network intrusion simulation tests.",
  },
  {
    id: 14,
    title: "Security Analyst (SOC)",
    company: "SecureBank Corp",
    location: "Onsite - Charlotte, NC",
    salary: "$85,000 - $110,000 USD / Year",
    description:
      "Monitor real-time logs for security alerts and handle breaches.",
  },
  {
    id: 15,
    title: "Application Security Engineer",
    company: "Saasify Solutions",
    location: "Fully Remote",
    salary: "$140,000 - $170,000 USD / Year",
    description:
      "Audit application codebases for vulnerabilities during active development cycles.",
  },
  {
    id: 16,
    title: "Product Manager (Technical)",
    company: "PayPulse Fintech",
    location: "Hybrid - San Francisco, CA",
    salary: "$135,000 - $165,000 USD / Year",
    description:
      "Direct the strategic engineering lifecycle for global B2B APIs.",
  },
  {
    id: 17,
    title: "UX/UI Designer",
    company: "CreativeFlow Digital",
    location: "Fully Remote",
    salary: "$85,000 - $115,000 USD / Year",
    description:
      "Wireframe and prototype user journeys for a SaaS logistics system.",
  },
  {
    id: 18,
    title: "Scrum Master",
    company: "AgileScale Corp",
    location: "Hybrid - Denver, CO",
    salary: "$95,000 - $120,000 USD / Year",
    description:
      "Facilitate daily sprints and remove blockages for three engineering teams.",
  },
  {
    id: 19,
    title: "Technical Support Engineer",
    company: "HostVibe Cloud",
    location: "Fully Remote",
    salary: "$55,000 - $75,000 USD / Year",
    description:
      "Troubleshoot technical hosting bottlenecks for high-tier enterprise clients.",
  },
  {
    id: 20,
    title: "QA Automation Engineer",
    company: "QualityFirst Software",
    location: "Fully Remote",
    salary: "$90,000 - $115,000 USD / Year",
    description:
      "Write automated end-to-end regression test scripts for web apps.",
  },
  {
    id: 21,
    title: "Blockchain Developer",
    company: "EtherLabs Decentralized",
    location: "Fully Remote",
    salary: "$150,000 - $190,000 USD / Year",
    description:
      "Design secure, audited smart contracts for a decentralized voting protocol.",
  },
  {
    id: 22,
    title: "IT Systems Administrator",
    company: "Prime Manufacturing",
    location: "Onsite - Detroit, MI",
    salary: "$75,000 - $95,000 USD / Year",
    description:
      "Configure, secure, and maintain internal office networks and employee hardware.",
  },
  {
    id: 23,
    title: "Database Administrator (DBA)",
    company: "HealthData Systems",
    location: "Hybrid - Boston, MA",
    salary: "$110,000 - $140,000 USD / Year",
    description:
      "Enforce performance tuning, indexing, and high availability for hospital records.",
  },
  {
    id: 24,
    title: "Hardware Verification Engineer",
    company: "SiliconCore Chips",
    location: "Onsite - Phoenix, AZ",
    salary: "$120,000 - $155,000 USD / Year",
    description:
      "Execute pre-silicon functional verification tests on next-gen microprocessors.",
  },
  {
    id: 25,
    title: "IoT Solutions Architect",
    company: "SmartGrid Energy",
    location: "Hybrid - Houston, TX",
    salary: "$145,000 - $180,000 USD / Year",
    description:
      "Oversee telemetry connections for thousands of solar energy hardware nodes.",
  },
];

export default jobs;
