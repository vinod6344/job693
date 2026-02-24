/**
 * Job Notification Tracker — Premium SaaS with jobs dataset and filtering
 * Design system: calm, minimal, 180ms ease-in-out.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'jobTrackerSaved';
  var PREFERENCES_KEY = 'jobTrackerPreferences';
  var JOBS_DATA = window.JOBS_DATA || [
    { id: "j1", title: "SDE Intern", company: "Amazon", location: "Bangalore", mode: "Hybrid", experience: "Fresher", skills: ["Java", "Data Structures", "Algorithms"], source: "LinkedIn", postedDaysAgo: 1, salaryRange: "₹40k–₹60k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/1", description: "Work on real-world projects alongside senior engineers. You will contribute to services used by millions of customers. Strong problem-solving and communication skills required." },
    { id: "j2", title: "Graduate Engineer Trainee", company: "TCS", location: "Chennai", mode: "Onsite", experience: "0-1", skills: ["Java", "SQL", "Spring Boot"], source: "Naukri", postedDaysAgo: 3, salaryRange: "3–5 LPA", applyUrl: "https://www.naukri.com/job/2", description: "GET program for fresh graduates. Training on core technologies and client projects. Opportunities across multiple units and locations in India." },
    { id: "j3", title: "Junior Backend Developer", company: "Razorpay", location: "Bangalore", mode: "Remote", experience: "1-3", skills: ["Go", "PostgreSQL", "Redis"], source: "LinkedIn", postedDaysAgo: 0, salaryRange: "10–18 LPA", applyUrl: "https://www.linkedin.com/jobs/view/3", description: "Build and maintain payment APIs and microservices. Experience with distributed systems and high-throughput systems is a plus. Fast-paced fintech environment." },
    { id: "j4", title: "Frontend Intern", company: "Flipkart", location: "Bangalore", mode: "Hybrid", experience: "Fresher", skills: ["React", "JavaScript", "CSS"], source: "Indeed", postedDaysAgo: 2, salaryRange: "₹25k–₹35k/month Internship", applyUrl: "https://www.indeed.com/viewjob/4", description: "Help build customer-facing web experiences. You will work with React and design systems. Mentorship from senior frontend engineers provided." },
    { id: "j5", title: "QA Intern", company: "Wipro", location: "Hyderabad", mode: "Onsite", experience: "Fresher", skills: ["Manual Testing", "Selenium", "JIRA"], source: "Naukri", postedDaysAgo: 5, salaryRange: "₹15k–₹25k/month Internship", applyUrl: "https://www.naukri.com/job/5", description: "Support test planning and execution for enterprise projects. Learn automation tools and quality processes. Good attention to detail required." },
    { id: "j6", title: "Data Analyst Intern", company: "Swiggy", location: "Bangalore", mode: "Hybrid", experience: "Fresher", skills: ["SQL", "Python", "Excel"], source: "LinkedIn", postedDaysAgo: 1, salaryRange: "₹30k–₹45k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/6", description: "Analyze order and user data to drive business decisions. Work with analytics and product teams. Strong SQL and storytelling skills preferred." },
    { id: "j7", title: "Java Developer (0-1)", company: "Infosys", location: "Pune", mode: "Onsite", experience: "0-1", skills: ["Java", "Hibernate", "REST APIs"], source: "Naukri", postedDaysAgo: 4, salaryRange: "3–5 LPA", applyUrl: "https://www.naukri.com/job/7", description: "Develop and maintain Java applications for global clients. Training on frameworks and agile methodologies. Multiple project opportunities." },
    { id: "j8", title: "Python Developer (Fresher)", company: "Zoho", location: "Chennai", mode: "Onsite", experience: "Fresher", skills: ["Python", "Django", "MySQL"], source: "LinkedIn", postedDaysAgo: 2, salaryRange: "4–6 LPA", applyUrl: "https://www.linkedin.com/jobs/view/8", description: "Build internal tools and product features using Python. Zoho offers a strong engineering culture and long-term growth. Chennai-based role." },
    { id: "j9", title: "React Developer (1-3)", company: "Freshworks", location: "Chennai", mode: "Hybrid", experience: "1-3", skills: ["React", "TypeScript", "Redux"], source: "Indeed", postedDaysAgo: 0, salaryRange: "8–14 LPA", applyUrl: "https://www.indeed.com/viewjob/9", description: "Own features for our customer engagement products. Work with design and backend teams. Experience with modern React and state management required." },
    { id: "j10", title: "SDE Intern", company: "Microsoft", location: "Hyderabad", mode: "Hybrid", experience: "Fresher", skills: ["C#", "Azure", "Algorithms"], source: "LinkedIn", postedDaysAgo: 1, salaryRange: "₹50k–₹70k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/10", description: "Contribute to cloud and productivity products. Mentorship and conversion opportunities for full-time roles. Strong fundamentals expected." },
    { id: "j11", title: "Backend Developer", company: "PhonePe", location: "Bangalore", mode: "Onsite", experience: "1-3", skills: ["Java", "Kafka", "Cassandra"], source: "Naukri", postedDaysAgo: 3, salaryRange: "12–20 LPA", applyUrl: "https://www.naukri.com/job/11", description: "Build scalable systems for millions of transactions. Work on payments and financial services. Prior fintech or high-scale experience is a plus." },
    { id: "j12", title: "DevOps Intern", company: "Accenture", location: "Mumbai", mode: "Hybrid", experience: "Fresher", skills: ["AWS", "Docker", "Linux"], source: "Indeed", postedDaysAgo: 6, salaryRange: "₹20k–₹30k/month Internship", applyUrl: "https://www.indeed.com/viewjob/12", description: "Support CI/CD pipelines and cloud infrastructure. Learn industry best practices. Basic scripting and Linux knowledge required." },
    { id: "j13", title: "Full Stack Intern", company: "CRED", location: "Bangalore", mode: "Remote", experience: "Fresher", skills: ["Node.js", "React", "MongoDB"], source: "LinkedIn", postedDaysAgo: 2, salaryRange: "₹35k–₹50k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/13", description: "Build features for the CRED app and web. Fast-paced startup environment. Strong JavaScript and willingness to learn required." },
    { id: "j14", title: "Java Developer", company: "Capgemini", location: "Gurgaon", mode: "Onsite", experience: "1-3", skills: ["Java", "Spring", "Oracle DB"], source: "Naukri", postedDaysAgo: 5, salaryRange: "6–10 LPA", applyUrl: "https://www.naukri.com/job/14", description: "Work on enterprise applications for global clients. Exposure to banking and retail domains. Good communication and teamwork expected." },
    { id: "j15", title: "Frontend Developer", company: "Juspay", location: "Bangalore", mode: "Hybrid", experience: "1-3", skills: ["React", "JavaScript", "Web Performance"], source: "LinkedIn", postedDaysAgo: 0, salaryRange: "10–16 LPA", applyUrl: "https://www.linkedin.com/jobs/view/15", description: "Build payment and checkout experiences used by top apps. Focus on performance and reliability. Prior frontend or mobile web experience preferred." },
    { id: "j16", title: "Data Engineer Intern", company: "IBM", location: "Bangalore", mode: "Hybrid", experience: "Fresher", skills: ["Python", "Spark", "SQL"], source: "Indeed", postedDaysAgo: 4, salaryRange: "₹30k–₹45k/month Internship", applyUrl: "https://www.indeed.com/viewjob/16", description: "Support data pipelines and analytics platforms. Work with cloud and on-prem systems. Interest in big data technologies required." },
    { id: "j17", title: "Android Developer (0-1)", company: "Paytm", location: "Noida", mode: "Onsite", experience: "0-1", skills: ["Kotlin", "Android SDK", "REST"], source: "Naukri", postedDaysAgo: 2, salaryRange: "5–8 LPA", applyUrl: "https://www.naukri.com/job/17", description: "Develop features for the Paytm app. Work with product and design. Knowledge of Kotlin or Java and Android basics required." },
    { id: "j18", title: "ML Engineer Intern", company: "Swiggy", location: "Bangalore", mode: "Remote", experience: "Fresher", skills: ["Python", "ML", "TensorFlow"], source: "LinkedIn", postedDaysAgo: 1, salaryRange: "₹40k–₹55k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/18", description: "Work on recommendation and personalization models. Collaborate with data science and product. Strong Python and ML fundamentals expected." },
    { id: "j19", title: "SDE Intern", company: "Google", location: "Hyderabad", mode: "Hybrid", experience: "Fresher", skills: ["C++", "Algorithms", "System Design"], source: "LinkedIn", postedDaysAgo: 0, salaryRange: "₹60k–₹90k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/19", description: "Contribute to Google products and infrastructure. Rigorous interview process. Open to pre-final and final year students from select institutes." },
    { id: "j20", title: "Graduate Engineer Trainee", company: "Cognizant", location: "Chennai", mode: "Onsite", experience: "0-1", skills: [".NET", "SQL", "Azure"], source: "Naukri", postedDaysAgo: 7, salaryRange: "3–5 LPA", applyUrl: "https://www.naukri.com/job/20", description: "GET program with training and placement on live projects. Multiple technology tracks available. Good academic record and learning attitude required." },
    { id: "j21", title: "Backend Intern", company: "Unacademy", location: "Bangalore", mode: "Remote", experience: "Fresher", skills: ["Node.js", "MongoDB", "Redis"], source: "Indeed", postedDaysAgo: 3, salaryRange: "₹25k–₹40k/month Internship", applyUrl: "https://www.indeed.com/viewjob/21", description: "Build APIs and services for the learning platform. Work with senior engineers. Interest in edtech and scalable systems preferred." },
    { id: "j22", title: "iOS Developer (1-3)", company: "Flipkart", location: "Bangalore", mode: "Hybrid", experience: "1-3", skills: ["Swift", "iOS", "UIKit"], source: "LinkedIn", postedDaysAgo: 2, salaryRange: "10–18 LPA", applyUrl: "https://www.linkedin.com/jobs/view/22", description: "Develop features for the Flipkart iOS app. Collaborate with product and design. Prior iOS or mobile development experience required." },
    { id: "j23", title: "DevOps Engineer", company: "Razorpay", location: "Bangalore", mode: "Remote", experience: "3-5", skills: ["Kubernetes", "Terraform", "AWS"], source: "Naukri", postedDaysAgo: 4, salaryRange: "15–25 LPA", applyUrl: "https://www.naukri.com/job/23", description: "Own CI/CD and cloud infrastructure. Ensure high availability and security. Strong experience with containers and IaC required." },
    { id: "j24", title: "QA Engineer", company: "Zoho", location: "Chennai", mode: "Onsite", experience: "0-1", skills: ["Automation", "Selenium", "API Testing"], source: "Indeed", postedDaysAgo: 5, salaryRange: "4–6 LPA", applyUrl: "https://www.indeed.com/viewjob/24", description: "Design and execute test cases for Zoho products. Develop automation scripts. Attention to detail and logical thinking required." },
    { id: "j25", title: "Product Analyst Intern", company: "Meesho", location: "Bangalore", mode: "Hybrid", experience: "Fresher", skills: ["SQL", "Excel", "Analytics"], source: "LinkedIn", postedDaysAgo: 1, salaryRange: "₹30k–₹45k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/25", description: "Analyze user behavior and product metrics. Support product decisions with data. Strong SQL and communication skills preferred." },
    { id: "j26", title: "Full Stack Developer", company: "ShareChat", location: "Bangalore", mode: "Hybrid", experience: "1-3", skills: ["React", "Node.js", "PostgreSQL"], source: "Naukri", postedDaysAgo: 0, salaryRange: "12–20 LPA", applyUrl: "https://www.naukri.com/job/26", description: "Build features for the ShareChat and Moj platforms. Work on scale and performance. Prior full stack or backend experience required." },
    { id: "j27", title: "SDE Intern", company: "Oracle", location: "Bangalore", mode: "Onsite", experience: "Fresher", skills: ["Java", "Cloud", "Databases"], source: "Indeed", postedDaysAgo: 6, salaryRange: "₹35k–₹50k/month Internship", applyUrl: "https://www.indeed.com/viewjob/27", description: "Work on Oracle Cloud or database products. Training and mentorship provided. Good programming fundamentals and learning ability required." },
    { id: "j28", title: "Backend Developer", company: "Dunzo", location: "Bangalore", mode: "Remote", experience: "1-3", skills: ["Python", "Django", "PostgreSQL"], source: "LinkedIn", postedDaysAgo: 2, salaryRange: "8–14 LPA", applyUrl: "https://www.linkedin.com/jobs/view/28", description: "Build and maintain delivery and logistics systems. Fast-paced hyperlocal startup. Experience with Python and APIs preferred." },
    { id: "j29", title: "Frontend Intern", company: "Policybazaar", location: "Gurgaon", mode: "Hybrid", experience: "Fresher", skills: ["React", "JavaScript", "HTML/CSS"], source: "Naukri", postedDaysAgo: 8, salaryRange: "₹20k–₹30k/month Internship", applyUrl: "https://www.naukri.com/job/29", description: "Develop user interfaces for insurance and comparison tools. Work with design and backend teams. Basic React and web fundamentals required." },
    { id: "j30", title: "Data Scientist Intern", company: "Ola", location: "Bangalore", mode: "Hybrid", experience: "Fresher", skills: ["Python", "ML", "Statistics"], source: "Indeed", postedDaysAgo: 3, salaryRange: "₹40k–₹55k/month Internship", applyUrl: "https://www.indeed.com/viewjob/30", description: "Work on demand forecasting and optimization models. Collaborate with product and operations. Strong quantitative and coding skills required." },
    { id: "j31", title: "Java Developer", company: "SAP", location: "Bangalore", mode: "Onsite", experience: "1-3", skills: ["Java", "SAP BTP", "REST"], source: "LinkedIn", postedDaysAgo: 5, salaryRange: "10–16 LPA", applyUrl: "https://www.linkedin.com/jobs/view/31", description: "Develop solutions on SAP Business Technology Platform. Work with global teams. Prior Java and cloud experience preferred." },
    { id: "j32", title: "React Native Developer", company: "PhonePe", location: "Bangalore", mode: "Onsite", experience: "1-3", skills: ["React Native", "JavaScript", "Redux"], source: "Naukri", postedDaysAgo: 1, salaryRange: "12–18 LPA", applyUrl: "https://www.naukri.com/job/32", description: "Build cross-platform features for the PhonePe app. Work on performance and UX. Prior React Native or mobile development experience required." },
    { id: "j33", title: "Graduate Engineer Trainee", company: "L&T Infotech", location: "Mumbai", mode: "Onsite", experience: "0-1", skills: ["Java", "SQL", "Web Technologies"], source: "Indeed", postedDaysAgo: 9, salaryRange: "3–5 LPA", applyUrl: "https://www.indeed.com/viewjob/33", description: "GET program with training and project assignment. Multiple domains and technologies. Good academic background and teamwork expected." },
    { id: "j34", title: "Backend Intern", company: "Zerodha", location: "Bangalore", mode: "Remote", experience: "Fresher", skills: ["Python", "PostgreSQL", "Linux"], source: "LinkedIn", postedDaysAgo: 0, salaryRange: "₹35k–₹50k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/34", description: "Work on trading and brokerage systems. High standards for reliability and performance. Strong Python and systems thinking required." },
    { id: "j35", title: "SDE Intern", company: "Dell", location: "Bangalore", mode: "Hybrid", experience: "Fresher", skills: ["Java", "Python", "Algorithms"], source: "Naukri", postedDaysAgo: 4, salaryRange: "₹30k–₹45k/month Internship", applyUrl: "https://www.naukri.com/job/35", description: "Contribute to enterprise software or infrastructure projects. Mentorship and learning opportunities. Good problem-solving skills required." },
    { id: "j36", title: "Frontend Developer", company: "Groww", location: "Bangalore", mode: "Hybrid", experience: "1-3", skills: ["React", "TypeScript", "GraphQL"], source: "Indeed", postedDaysAgo: 2, salaryRange: "10–16 LPA", applyUrl: "https://www.indeed.com/viewjob/36", description: "Build investing and mutual fund experiences. Work with design and backend. Prior React and TypeScript experience preferred." },
    { id: "j37", title: "QA Intern", company: "Byju's", location: "Bangalore", mode: "Remote", experience: "Fresher", skills: ["Manual Testing", "API Testing", "Mobile"], source: "LinkedIn", postedDaysAgo: 7, salaryRange: "₹18k–₹28k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/37", description: "Support quality assurance for learning apps. Test on web and mobile. Good analytical and communication skills required." },
    { id: "j38", title: "DevOps Intern", company: "Paytm", location: "Noida", mode: "Onsite", experience: "Fresher", skills: ["Jenkins", "AWS", "Shell"], source: "Naukri", postedDaysAgo: 3, salaryRange: "₹22k–₹32k/month Internship", applyUrl: "https://www.naukri.com/job/38", description: "Support deployment and monitoring pipelines. Learn cloud and automation. Basic Linux and scripting knowledge required." },
    { id: "j39", title: "Data Analyst", company: "Accenture", location: "Hyderabad", mode: "Hybrid", experience: "1-3", skills: ["SQL", "Power BI", "Python"], source: "Indeed", postedDaysAgo: 5, salaryRange: "6–10 LPA", applyUrl: "https://www.indeed.com/viewjob/39", description: "Analyze data for client projects across industries. Create reports and dashboards. Good SQL and visualization skills required." },
    { id: "j40", title: "Junior Backend Developer", company: "Postman", location: "Bangalore", mode: "Remote", experience: "0-1", skills: ["Node.js", "PostgreSQL", "REST"], source: "LinkedIn", postedDaysAgo: 1, salaryRange: "6–10 LPA", applyUrl: "https://www.linkedin.com/jobs/view/40", description: "Build and maintain APIs and services for the Postman platform. Work with a global team. Strong Node.js and API design basics required." },
    { id: "j41", title: "SDE Intern", company: "Intuit", location: "Bangalore", mode: "Hybrid", experience: "Fresher", skills: ["Java", "React", "Databases"], source: "Naukri", postedDaysAgo: 4, salaryRange: "₹45k–₹60k/month Internship", applyUrl: "https://www.naukri.com/job/41", description: "Work on tax or accounting products. Mentorship and conversion opportunities. Good programming and communication skills required." },
    { id: "j42", title: "Python Developer", company: "Wipro", location: "Pune", mode: "Onsite", experience: "1-3", skills: ["Python", "Django", "AWS"], source: "Indeed", postedDaysAgo: 6, salaryRange: "6–10 LPA", applyUrl: "https://www.indeed.com/viewjob/42", description: "Develop Python applications for enterprise clients. Work on web and automation projects. Good Python and problem-solving skills required." },
    { id: "j43", title: "Frontend Intern", company: "Razorpay", location: "Bangalore", mode: "Remote", experience: "Fresher", skills: ["React", "JavaScript", "CSS"], source: "LinkedIn", postedDaysAgo: 0, salaryRange: "₹35k–₹50k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/43", description: "Build UI for payment and dashboard products. Work with design system and APIs. Strong React and attention to detail required." },
    { id: "j44", title: "Backend Developer", company: "Innovaccer", location: "Noida", mode: "Hybrid", experience: "1-3", skills: ["Python", "FastAPI", "MongoDB"], source: "Naukri", postedDaysAgo: 2, salaryRange: "10–16 LPA", applyUrl: "https://www.naukri.com/job/44", description: "Build healthcare data and analytics APIs. Work with product and data teams. Prior Python and API development experience preferred." },
    { id: "j45", title: "Graduate Engineer Trainee", company: "Tech Mahindra", location: "Pune", mode: "Onsite", experience: "0-1", skills: ["Java", "SQL", "Testing"], source: "Indeed", postedDaysAgo: 8, salaryRange: "3–5 LPA", applyUrl: "https://www.indeed.com/viewjob/45", description: "GET program with training and project deployment. Multiple technology streams. Good academic record and learning attitude required." },
    { id: "j46", title: "ML Intern", company: "Flipkart", location: "Bangalore", mode: "Hybrid", experience: "Fresher", skills: ["Python", "ML", "NLP"], source: "LinkedIn", postedDaysAgo: 3, salaryRange: "₹45k–₹60k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/46", description: "Work on search and recommendation models. Collaborate with applied scientists. Strong ML fundamentals and Python required." },
    { id: "j47", title: "iOS Intern", company: "Swiggy", location: "Bangalore", mode: "Remote", experience: "Fresher", skills: ["Swift", "iOS", "Xcode"], source: "Naukri", postedDaysAgo: 5, salaryRange: "₹30k–₹45k/month Internship", applyUrl: "https://www.naukri.com/job/47", description: "Develop features for the Swiggy iOS app. Work with product and design. Prior iOS or mobile development interest required." },
    { id: "j48", title: "Full Stack Intern", company: "CleverTap", location: "Mumbai", mode: "Hybrid", experience: "Fresher", skills: ["Node.js", "React", "MongoDB"], source: "Indeed", postedDaysAgo: 1, salaryRange: "₹28k–₹40k/month Internship", applyUrl: "https://www.indeed.com/viewjob/48", description: "Build features for the engagement and analytics platform. Work with senior engineers. Good JavaScript and willingness to learn required." },
    { id: "j49", title: "Java Developer", company: "Infosys", location: "Bangalore", mode: "Onsite", experience: "1-3", skills: ["Java", "Spring", "Microservices"], source: "LinkedIn", postedDaysAgo: 7, salaryRange: "6–10 LPA", applyUrl: "https://www.linkedin.com/jobs/view/49", description: "Develop and maintain Java applications for global clients. Work on digital transformation projects. Good Java and teamwork skills required." },
    { id: "j50", title: "DevOps Engineer", company: "Amazon", location: "Hyderabad", mode: "Onsite", experience: "3-5", skills: ["AWS", "Terraform", "Python"], source: "Naukri", postedDaysAgo: 4, salaryRange: "18–28 LPA", applyUrl: "https://www.naukri.com/job/50", description: "Own infrastructure and deployment for AWS services. Ensure reliability and security. Strong cloud and automation experience required." },
    { id: "j51", title: "React Developer", company: "BrowserStack", location: "Mumbai", mode: "Remote", experience: "1-3", skills: ["React", "TypeScript", "Testing"], source: "Indeed", postedDaysAgo: 0, salaryRange: "12–18 LPA", applyUrl: "https://www.indeed.com/viewjob/51", description: "Build UI for the testing platform. Work on developer tools and dashboards. Prior React and frontend experience required." },
    { id: "j52", title: "SDE Intern", company: "Adobe", location: "Noida", mode: "Hybrid", experience: "Fresher", skills: ["C++", "Algorithms", "Data Structures"], source: "LinkedIn", postedDaysAgo: 2, salaryRange: "₹50k–₹65k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/52", description: "Contribute to Creative Cloud or Experience Cloud products. Mentorship and conversion opportunities. Strong fundamentals required." },
    { id: "j53", title: "Backend Intern", company: "CRED", location: "Bangalore", mode: "Remote", experience: "Fresher", skills: ["Node.js", "PostgreSQL", "Redis"], source: "Naukri", postedDaysAgo: 6, salaryRange: "₹35k–₹50k/month Internship", applyUrl: "https://www.naukri.com/job/53", description: "Build APIs and services for the CRED platform. Fast-paced fintech environment. Good Node.js and database basics required." },
    { id: "j54", title: "Data Engineer", company: "TCS", location: "Chennai", mode: "Onsite", experience: "1-3", skills: ["Spark", "Python", "SQL"], source: "Indeed", postedDaysAgo: 9, salaryRange: "6–12 LPA", applyUrl: "https://www.indeed.com/viewjob/54", description: "Build and maintain data pipelines for client projects. Work with analytics and cloud. Prior data or ETL experience preferred." },
    { id: "j55", title: "Frontend Developer", company: "Delhivery", location: "Gurgaon", mode: "Hybrid", experience: "1-3", skills: ["React", "JavaScript", "Redux"], source: "LinkedIn", postedDaysAgo: 3, salaryRange: "8–14 LPA", applyUrl: "https://www.linkedin.com/jobs/view/55", description: "Build logistics and tracking interfaces. Work with product and operations. Prior React and frontend experience required." },
    { id: "j56", title: "QA Engineer", company: "Capgemini", location: "Bangalore", mode: "Onsite", experience: "0-1", skills: ["Selenium", "Java", "API Testing"], source: "Naukri", postedDaysAgo: 5, salaryRange: "4–6 LPA", applyUrl: "https://www.naukri.com/job/56", description: "Design and execute automated tests for enterprise applications. Work with development teams. Good Java and testing basics required." },
    { id: "j57", title: "Python Developer", company: "Druva", location: "Pune", mode: "Remote", experience: "1-3", skills: ["Python", "AWS", "Linux"], source: "Indeed", postedDaysAgo: 1, salaryRange: "10–16 LPA", applyUrl: "https://www.indeed.com/viewjob/57", description: "Build backup and cloud data management solutions. Work with distributed systems. Prior Python and cloud experience preferred." },
    { id: "j58", title: "SDE Intern", company: "VMware", location: "Bangalore", mode: "Hybrid", experience: "Fresher", skills: ["Java", "Python", "Virtualization"], source: "LinkedIn", postedDaysAgo: 4, salaryRange: "₹45k–₹60k/month Internship", applyUrl: "https://www.linkedin.com/jobs/view/58", description: "Work on cloud or virtualization products. Training and mentorship provided. Strong programming and systems interest required." },
    { id: "j59", title: "Junior Full Stack Developer", company: "Licious", location: "Bangalore", mode: "Onsite", experience: "0-1", skills: ["React", "Node.js", "MongoDB"], source: "Naukri", postedDaysAgo: 2, salaryRange: "5–8 LPA", applyUrl: "https://www.naukri.com/job/59", description: "Build features for the e-commerce platform. Work with product and design. Good JavaScript and learning attitude required." },
    { id: "j60", title: "Backend Developer", company: "Cure.fit", location: "Bangalore", mode: "Hybrid", experience: "1-3", skills: ["Java", "Spring Boot", "PostgreSQL"], source: "Indeed", postedDaysAgo: 10, salaryRange: "10–16 LPA", applyUrl: "https://www.indeed.com/viewjob/60", description: "Build APIs for fitness and healthcare products. Work with mobile and data teams. Prior Java and REST API experience required." }
  ];
  var ROUTES = [
    { path: '/', name: 'landing' },
    { path: '/dashboard', name: 'dashboard' },
    { path: '/saved', name: 'saved' },
    { path: '/digest', name: 'digest' },
    { path: '/settings', name: 'settings' },
    { path: '/proof', name: 'proof' }
  ];

  function getJobs() {
    return (JOBS_DATA || []).slice();
  }

  function getSavedIds() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function setSavedIds(ids) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {}
  }

  function isSaved(id) {
    return getSavedIds().indexOf(id) >= 0;
  }

  function saveJob(id) {
    var ids = getSavedIds();
    if (ids.indexOf(id) >= 0) return;
    ids.push(id);
    setSavedIds(ids);
  }

  function unsaveJob(id) {
    var ids = getSavedIds().filter(function (x) { return x !== id; });
    setSavedIds(ids);
  }

  function getPreferences() {
    try {
      var raw = localStorage.getItem(PREFERENCES_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  function setPreferences(prefs) {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    } catch (e) {}
  }

  function getPath() {
    var hash = window.location.hash.slice(1) || '';
    return (hash === '' || hash === '/') ? '/' : hash.replace(/\/$/, '') || '/';
  }

  function findRoute(path) {
    var normal = path === '' ? '/' : path;
    for (var i = 0; i < ROUTES.length; i++) {
      if (ROUTES[i].path === normal) return ROUTES[i];
    }
    return null;
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function computeMatchScore(job, prefs) {
    if (!prefs) return 0;
    var score = 0;
    var roleKeywords = (prefs.roleKeywords || '').split(',').map(function (k) { return k.trim().toLowerCase(); }).filter(Boolean);
    var preferredLocations = prefs.preferredLocations || [];
    var preferredMode = prefs.preferredMode || [];
    var experienceLevel = prefs.experienceLevel || '';
    var userSkills = (prefs.skills || '').split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);

    if (roleKeywords.length) {
      var titleLower = (job.title || '').toLowerCase();
      var descLower = (job.description || '').toLowerCase();
      for (var i = 0; i < roleKeywords.length; i++) {
        if (titleLower.indexOf(roleKeywords[i]) >= 0) { score += 25; break; }
      }
      for (var j = 0; j < roleKeywords.length; j++) {
        if (descLower.indexOf(roleKeywords[j]) >= 0) { score += 15; break; }
      }
    }
    if (preferredLocations.length && job.location && preferredLocations.indexOf(job.location) >= 0) score += 15;
    if (preferredMode.length && job.mode && preferredMode.indexOf(job.mode) >= 0) score += 10;
    if (experienceLevel && job.experience === experienceLevel) score += 10;
    if (userSkills.length && job.skills && job.skills.length) {
      var jobSkillsLower = job.skills.map(function (s) { return String(s).toLowerCase(); });
      for (var k = 0; k < userSkills.length; k++) {
        if (jobSkillsLower.indexOf(userSkills[k]) >= 0) { score += 15; break; }
      }
    }
    if (job.postedDaysAgo != null && job.postedDaysAgo <= 2) score += 5;
    if (job.source === 'LinkedIn') score += 5;
    return Math.min(100, score);
  }

  function extractSalaryNum(s) {
    if (!s || typeof s !== 'string') return 0;
    var m = s.match(/\d+/);
    return m ? parseInt(m[0], 10) : 0;
  }

  function getFilterValues() {
    var kw = document.getElementById('filter-keyword');
    var loc = document.getElementById('filter-location');
    var mode = document.getElementById('filter-mode');
    var exp = document.getElementById('filter-experience');
    var src = document.getElementById('filter-source');
    var sort = document.getElementById('filter-sort');
    var showMatches = document.getElementById('filter-show-matches');
    return {
      keyword: kw ? kw.value.trim().toLowerCase() : '',
      location: loc ? loc.value : '',
      mode: mode ? mode.value : '',
      experience: exp ? exp.value : '',
      source: src ? src.value : '',
      sort: sort ? sort.value : 'latest',
      showMatchesOnly: showMatches ? showMatches.checked : false
    };
  }

  function filterAndSortJobs(jobs, filter, prefs) {
    var prefs = prefs || getPreferences();
    var minMatchScore = (prefs && prefs.minMatchScore != null) ? Number(prefs.minMatchScore) : 40;

    var list = jobs.map(function (j) {
      var score = computeMatchScore(j, prefs);
      return { job: j, matchScore: score };
    });

    list = list.filter(function (x) {
      var j = x.job;
      if (filter.keyword) {
        var t = (j.title + ' ' + j.company).toLowerCase();
        if (t.indexOf(filter.keyword) < 0) return false;
      }
      if (filter.location && j.location !== filter.location) return false;
      if (filter.mode && j.mode !== filter.mode) return false;
      if (filter.experience && j.experience !== filter.experience) return false;
      if (filter.source && j.source !== filter.source) return false;
      if (filter.showMatchesOnly && x.matchScore < minMatchScore) return false;
      return true;
    });

    list.sort(function (a, b) {
      var j1 = a.job, j2 = b.job;
      if (filter.sort === 'match') return b.matchScore - a.matchScore;
      if (filter.sort === 'salary') return extractSalaryNum(j2.salaryRange) - extractSalaryNum(j1.salaryRange);
      var da = j1.postedDaysAgo != null ? j1.postedDaysAgo : 0;
      var db = j2.postedDaysAgo != null ? j2.postedDaysAgo : 0;
      return filter.sort === 'oldest' ? db - da : da - db;
    });
    return list;
  }

  function postedText(days) {
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return days + ' days ago';
  }

  function getMatchBadgeClass(score) {
    if (score >= 80) return 'ds-match-badge ds-match-badge--high';
    if (score >= 60) return 'ds-match-badge ds-match-badge--medium';
    if (score >= 40) return 'ds-match-badge ds-match-badge--neutral';
    return 'ds-match-badge ds-match-badge--low';
  }

  function renderJobCard(job, options) {
    options = options || {};
    var saved = isSaved(job.id);
    var saveLabel = options.savedPage ? 'Remove' : (saved ? 'Saved' : 'Save');
    var saveDisabled = options.savedPage ? '' : (saved ? ' disabled' : '');
    var matchScore = options.matchScore != null ? options.matchScore : 0;
    var badgeHtml = (options.showMatch === true && matchScore >= 0) ? '<span class="' + getMatchBadgeClass(matchScore) + '">' + escapeHtml(matchScore) + '% match</span>' : '';
    return (
      '<div class="ds-job-card" data-job-id="' + escapeHtml(job.id) + '">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;">' +
          '<div>' +
            '<h3 class="ds-job-card__title">' + escapeHtml(job.title) + '</h3>' +
            '<p class="ds-job-card__company">' + escapeHtml(job.company) + '</p>' +
          '</div>' +
          (badgeHtml ? '<div>' + badgeHtml + '</div>' : '') +
        '</div>' +
        '<div class="ds-job-card__meta">' +
          '<span>' + escapeHtml(job.location) + '</span>' +
          '<span> · </span>' +
          '<span>' + escapeHtml(job.mode) + '</span>' +
          '<span> · </span>' +
          '<span>' + escapeHtml(job.experience) + '</span>' +
        '</div>' +
        '<p class="ds-job-card__salary">' + escapeHtml(job.salaryRange || '') + '</p>' +
        '<div class="ds-job-card__footer">' +
          '<span class="ds-job-card__source">' + escapeHtml(job.source || '') + '</span>' +
          '<span class="ds-job-card__posted">' + postedText(job.postedDaysAgo) + '</span>' +
          '<div class="ds-job-card__actions">' +
            '<button type="button" class="ds-btn ds-btn--secondary" data-action="view" data-job-id="' + escapeHtml(job.id) + '">View</button>' +
            (options.savedPage
              ? '<button type="button" class="ds-btn ds-btn--secondary" data-action="remove" data-job-id="' + escapeHtml(job.id) + '">Remove</button>'
              : '<button type="button" class="ds-btn ds-btn--secondary" data-action="save" data-job-id="' + escapeHtml(job.id) + '"' + saveDisabled + '>' + saveLabel + '</button>'
            ) +
            '<a href="' + escapeHtml(job.applyUrl || '#') + '" target="_blank" rel="noopener" class="ds-btn ds-btn--primary" data-action="apply" data-apply-url="' + escapeHtml(job.applyUrl || '') + '">Apply</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderFilterBar(uniqueLocations, uniqueSources, prefs) {
    return (
      '<div class="ds-filter">' +
        '<div class="ds-filter__group ds-filter__group--search">' +
          '<label class="ds-label" for="filter-keyword">Keyword</label>' +
          '<input type="text" id="filter-keyword" class="ds-input" placeholder="Title or company">' +
        '</div>' +
        '<div class="ds-filter__group">' +
          '<label class="ds-label" for="filter-location">Location</label>' +
          '<select id="filter-location" class="ds-select"><option value="">All</option>' +
          uniqueLocations.map(function (l) { return '<option value="' + escapeHtml(l) + '">' + escapeHtml(l) + '</option>'; }).join('') +
          '</select>' +
        '</div>' +
        '<div class="ds-filter__group">' +
          '<label class="ds-label" for="filter-mode">Mode</label>' +
          '<select id="filter-mode" class="ds-select">' +
            '<option value="">All</option><option value="Remote">Remote</option><option value="Hybrid">Hybrid</option><option value="Onsite">Onsite</option>' +
          '</select>' +
        '</div>' +
        '<div class="ds-filter__group">' +
          '<label class="ds-label" for="filter-experience">Experience</label>' +
          '<select id="filter-experience" class="ds-select">' +
            '<option value="">All</option><option value="Fresher">Fresher</option><option value="0-1">0-1</option><option value="1-3">1-3</option><option value="3-5">3-5</option>' +
          '</select>' +
        '</div>' +
        '<div class="ds-filter__group">' +
          '<label class="ds-label" for="filter-source">Source</label>' +
          '<select id="filter-source" class="ds-select"><option value="">All</option>' +
          uniqueSources.map(function (s) { return '<option value="' + escapeHtml(s) + '">' + escapeHtml(s) + '</option>'; }).join('') +
          '</select>' +
        '</div>' +
        '<div class="ds-filter__group">' +
          '<label class="ds-label" for="filter-sort">Sort</label>' +
          '<select id="filter-sort" class="ds-select">' +
            '<option value="latest">Latest</option>' +
            '<option value="match">Match Score</option>' +
            '<option value="salary">Salary</option>' +
            '<option value="oldest">Oldest</option>' +
          '</select>' +
        '</div>' +
      '</div>' +
      '<div class="ds-toggle-row">' +
        '<label class="ds-checkbox">' +
          '<input type="checkbox" id="filter-show-matches">' +
          '<span>Show only jobs above my threshold</span>' +
        '</label>' +
      '</div>'
    );
  }

  function updateDashboardJobs() {
    var container = document.getElementById('dashboard-jobs');
    if (!container) return;
    var jobs = getJobs();
    var filter = getFilterValues();
    var list = filterAndSortJobs(jobs, filter);
    if (list.length === 0) {
      container.innerHTML = '<div class="ds-no-results"><p class="ds-no-results__text">No roles match your criteria. Adjust filters or lower threshold.</p></div>';
      return;
    }
    container.innerHTML = '<div class="ds-jobs">' + list.map(function (x) { return renderJobCard(x.job, { matchScore: x.matchScore, showMatch: true }); }).join('') + '</div>';
  }

  function renderDashboard() {
    var jobs = getJobs();
    var prefs = getPreferences();
    var locSet = {};
    var srcSet = {};
    jobs.forEach(function (j) {
      if (j.location) locSet[j.location] = true;
      if (j.source) srcSet[j.source] = true;
    });
    var uniqueLocations = Object.keys(locSet).sort();
    var uniqueSources = Object.keys(srcSet).sort();
    var filterHtml = renderFilterBar(uniqueLocations, uniqueSources, prefs);
    var list = filterAndSortJobs(jobs, getFilterValues(), prefs);
    var jobsHtml = list.length === 0
      ? '<div class="ds-no-results"><p class="ds-no-results__text">No roles match your criteria. Adjust filters or lower threshold.</p></div>'
      : '<div class="ds-jobs">' + list.map(function (x) { return renderJobCard(x.job, { matchScore: x.matchScore, showMatch: true }); }).join('') + '</div>';
    var bannerHtml = !prefs ? '<div class="ds-banner">Set your preferences to activate intelligent matching.</div>' : '';
    return (
      '<div class="ds-route__inner" style="max-width: none;">' +
        '<h1 class="ds-headline">Dashboard</h1>' +
        '<p class="ds-subline" style="margin-bottom: 24px;">Browse and filter jobs. View details, save, or apply.</p>' +
        bannerHtml +
        filterHtml +
        '<div id="dashboard-jobs">' + jobsHtml + '</div>' +
      '</div>'
    );
  }

  function openModal(job) {
    var skills = (job.skills || []).map(function (s) { return '<span class="ds-modal__skill">' + escapeHtml(s) + '</span>'; }).join('');
    var html = (
      '<div class="ds-modal-backdrop" id="job-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
        '<div class="ds-modal">' +
          '<h2 class="ds-modal__title" id="modal-title">' + escapeHtml(job.title) + '</h2>' +
          '<p class="ds-modal__company">' + escapeHtml(job.company) + '</p>' +
          '<div class="ds-modal__section">' +
            '<p class="ds-modal__section-title">Description</p>' +
            '<p class="ds-modal__description">' + escapeHtml(job.description || '') + '</p>' +
          '</div>' +
          '<div class="ds-modal__section">' +
            '<p class="ds-modal__section-title">Skills</p>' +
            '<div class="ds-modal__skills">' + skills + '</div>' +
          '</div>' +
          '<div class="ds-modal__actions">' +
            '<button type="button" class="ds-btn ds-btn--secondary" data-action="close-modal">Close</button>' +
            '<a href="' + escapeHtml(job.applyUrl || '#') + '" target="_blank" rel="noopener" class="ds-btn ds-btn--primary">Apply</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    var backdrop = wrap.firstElementChild;
    document.body.appendChild(backdrop);
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });
    var closeBtn = backdrop.querySelector('[data-action="close-modal"]');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
  }

  function closeModal() {
    var el = document.getElementById('job-modal');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function renderSaved() {
    var ids = getSavedIds();
    var jobs = getJobs();
    var savedJobs = ids.map(function (id) { return jobs.find(function (j) { return j.id === id; }); }).filter(Boolean);
    if (savedJobs.length === 0) {
      return (
        '<div class="ds-route__inner">' +
          '<h1 class="ds-headline">Saved</h1>' +
          '<div class="ds-empty" style="margin-top: 24px;">' +
            '<h2 class="ds-empty__title">Nothing saved yet</h2>' +
            '<p class="ds-empty__text">Jobs you save from the Dashboard will appear here and persist after reload.</p>' +
          '</div>' +
        '</div>'
      );
    }
    var cardsHtml = '<div class="ds-jobs">' + savedJobs.map(function (j) { return renderJobCard(j, { savedPage: true }); }).join('') + '</div>';
    return (
      '<div class="ds-route__inner" style="max-width: none;">' +
        '<h1 class="ds-headline">Saved</h1>' +
        '<p class="ds-subline" style="margin-bottom: 24px;">Your saved jobs. Remove to take them off the list.</p>' +
        cardsHtml +
      '</div>'
    );
  }

  function renderLanding() {
    return (
      '<div class="ds-route__inner">' +
        '<h1 class="ds-headline">Stop Missing The Right Jobs.</h1>' +
        '<p class="ds-subline">Precision-matched job discovery delivered daily at 9AM.</p>' +
        '<div class="ds-landing-cta">' +
          '<a href="#/settings" class="ds-btn ds-btn--primary" data-link>Start Tracking</a>' +
        '</div>' +
      '</div>'
    );
  }

  function handleSettingsSave() {
    var roleKeywords = (document.getElementById('role-keywords') || {}).value || '';
    var locEl = document.getElementById('preferred-locations');
    var preferredLocations = [];
    if (locEl && locEl.options) {
      for (var i = 0; i < locEl.options.length; i++) {
        if (locEl.options[i].selected) preferredLocations.push(locEl.options[i].value);
      }
    }
    var preferredMode = [];
    ['Remote', 'Hybrid', 'Onsite'].forEach(function (m) {
      var cb = document.querySelector('input[name="preferred-mode"][value="' + m + '"]');
      if (cb && cb.checked) preferredMode.push(m);
    });
    var experienceLevel = (document.getElementById('experience-level') || {}).value || '';
    var skills = (document.getElementById('skills') || {}).value || '';
    var minMatchScore = parseInt((document.getElementById('min-match-score') || {}).value, 10) || 40;
    var prefs = {
      roleKeywords: roleKeywords.trim(),
      preferredLocations: preferredLocations,
      preferredMode: preferredMode,
      experienceLevel: experienceLevel,
      skills: skills.trim(),
      minMatchScore: Math.min(100, Math.max(0, minMatchScore))
    };
    setPreferences(prefs);
    if (getPath() === '/dashboard') updateDashboardJobs();
  }

  function renderSettings() {
    var prefs = getPreferences();
    var roleKeywords = (prefs && prefs.roleKeywords) ? escapeHtml(prefs.roleKeywords) : '';
    var preferredLocations = prefs && prefs.preferredLocations ? prefs.preferredLocations : [];
    var preferredMode = prefs && prefs.preferredMode ? prefs.preferredMode : [];
    var experienceLevel = (prefs && prefs.experienceLevel) ? prefs.experienceLevel : '';
    var skills = (prefs && prefs.skills) ? escapeHtml(prefs.skills) : '';
    var minMatchScore = (prefs && prefs.minMatchScore != null) ? prefs.minMatchScore : 40;

    var jobs = getJobs();
    var locSet = {};
    jobs.forEach(function (j) { if (j.location) locSet[j.location] = true; });
    var allLocations = Object.keys(locSet).sort();

    var locOptions = allLocations.map(function (l) {
      var sel = preferredLocations.indexOf(l) >= 0 ? ' selected' : '';
      return '<option value="' + escapeHtml(l) + '"' + sel + '>' + escapeHtml(l) + '</option>';
    }).join('');

    var expOptions = ['Fresher', '0-1', '1-3', '3-5'].map(function (e) {
      var sel = experienceLevel === e ? ' selected' : '';
      return '<option value="' + escapeHtml(e) + '"' + sel + '>' + escapeHtml(e) + '</option>';
    }).join('');

    return (
      '<div class="ds-route__inner">' +
        '<h1 class="ds-headline">Settings</h1>' +
        '<p class="ds-subline" style="margin-bottom: 24px;">Configure your preferences for intelligent job matching.</p>' +
        '<form class="ds-form" id="settings-form" novalidate>' +
          '<div class="ds-field">' +
            '<label class="ds-label" for="role-keywords">Role keywords (comma-separated)</label>' +
            '<input type="text" id="role-keywords" class="ds-input" placeholder="e.g. React, Frontend, Backend" value="' + roleKeywords + '">' +
          '</div>' +
          '<div class="ds-field">' +
            '<label class="ds-label" for="preferred-locations">Preferred locations (multi-select)</label>' +
            '<select id="preferred-locations" class="ds-select" multiple>' +
              locOptions +
            '</select>' +
          '</div>' +
          '<div class="ds-field">' +
            '<span class="ds-label">Preferred mode</span>' +
            '<div class="ds-checkbox-group">' +
              '<label class="ds-checkbox"><input type="checkbox" name="preferred-mode" value="Remote"' + (preferredMode.indexOf('Remote') >= 0 ? ' checked' : '') + '> Remote</label>' +
              '<label class="ds-checkbox"><input type="checkbox" name="preferred-mode" value="Hybrid"' + (preferredMode.indexOf('Hybrid') >= 0 ? ' checked' : '') + '> Hybrid</label>' +
              '<label class="ds-checkbox"><input type="checkbox" name="preferred-mode" value="Onsite"' + (preferredMode.indexOf('Onsite') >= 0 ? ' checked' : '') + '> Onsite</label>' +
            '</div>' +
          '</div>' +
          '<div class="ds-field">' +
            '<label class="ds-label" for="experience-level">Experience level</label>' +
            '<select id="experience-level" class="ds-select">' +
              '<option value="">Select level</option>' + expOptions +
            '</select>' +
          '</div>' +
          '<div class="ds-field">' +
            '<label class="ds-label" for="skills">Skills (comma-separated)</label>' +
            '<input type="text" id="skills" class="ds-input" placeholder="e.g. React, Java, Python" value="' + skills + '">' +
          '</div>' +
          '<div class="ds-field">' +
            '<label class="ds-label" for="min-match-score">Minimum match score (0–100): <span id="min-match-value">' + minMatchScore + '</span></label>' +
            '<input type="range" id="min-match-score" class="ds-slider" min="0" max="100" value="' + minMatchScore + '">' +
          '</div>' +
          '<button type="button" id="settings-save" class="ds-btn ds-btn--primary">Save preferences</button>' +
        '</form>' +
      '</div>'
    );
  }

  function renderDigest() {
    return (
      '<div class="ds-route__inner">' +
        '<h1 class="ds-headline">Digest</h1>' +
        '<div class="ds-empty" style="margin-top: 24px;">' +
          '<h2 class="ds-empty__title">Daily summary coming next</h2>' +
          '<p class="ds-empty__text">Your precision-matched job digest will be delivered here. No logic yet.</p>' +
        '</div>' +
      '</div>'
    );
  }

  function renderProof() {
    return (
      '<div class="ds-route__inner">' +
        '<h1 class="ds-headline">Proof</h1>' +
        '<p class="ds-subline">Placeholder for artifact collection. This section will be built in the next step.</p>' +
      '</div>'
    );
  }

  function render404() {
    return (
      '<div class="ds-route__inner ds-route--404">' +
        '<h1 class="ds-headline">Page Not Found</h1>' +
        '<p class="ds-subline">The page you are looking for does not exist.</p>' +
      '</div>'
    );
  }

  function renderRoute(route) {
    switch (route.name) {
      case 'landing': return renderLanding();
      case 'settings': return renderSettings();
      case 'dashboard': return renderDashboard();
      case 'saved': return renderSaved();
      case 'digest': return renderDigest();
      case 'proof': return renderProof();
      default: return render404();
    }
  }

  function setActiveLink(path) {
    var pathNorm = (path === '' || path === '/') ? '/' : path;
    var allLinks = document.querySelectorAll('.ds-nav__link[href]');
    allLinks.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var linkPath = (href.indexOf('#') === 0) ? (href.slice(1).replace(/\/$/, '') || '/') : (href === '/' ? '/' : href.replace(/\/$/, ''));
      if (linkPath === pathNorm) {
        a.classList.add('is-active');
      } else {
        a.classList.remove('is-active');
      }
    });
  }

  function render() {
    var path = getPath();
    var route = findRoute(path);
    var app = document.getElementById('app');
    if (!app) return;

    if (route) {
      app.innerHTML = renderRoute(route);
    } else {
      app.innerHTML = render404();
    }

    setActiveLink(path);
    closeNavDropdown();
    closeModal();

    if (route && route.name === 'dashboard') {
      updateDashboardJobs();
      var keyword = document.getElementById('filter-keyword');
      var selects = document.querySelectorAll('#filter-location, #filter-mode, #filter-experience, #filter-source, #filter-sort');
      var showMatches = document.getElementById('filter-show-matches');
      function onFilterChange() { updateDashboardJobs(); }
      if (keyword) keyword.addEventListener('input', onFilterChange);
      selects.forEach(function (s) { s.addEventListener('change', onFilterChange); });
      if (showMatches) showMatches.addEventListener('change', onFilterChange);
    }
    if (route && route.name === 'settings') {
      var saveBtn = document.getElementById('settings-save');
      if (saveBtn) saveBtn.addEventListener('click', handleSettingsSave);
      var slider = document.getElementById('min-match-score');
      var label = document.getElementById('min-match-value');
      if (slider && label) slider.addEventListener('input', function () { label.textContent = slider.value; });
    }
  }

  function navigate(href) {
    var path = (href && href.indexOf('#') === 0) ? (href.slice(1) || '/') : (href === '/' ? '/' : (href || '').replace(/\/$/, ''));
    path = (path === '' || path === '/') ? '/' : path.replace(/\/$/, '') || '/';
    var currentPath = getPath();
    if (path === currentPath) return;
    window.location.hash = path === '/' ? '#/' : '#' + path;
    render();
  }

  function handleClick(e) {
    var a = e.target.closest('a[data-link]');
    if (a && a.target !== '_blank' && !a.hasAttribute('download')) {
      var href = a.getAttribute('href');
      if (href && href.indexOf('://') === -1) {
        e.preventDefault();
        navigate(href && href.indexOf('#') === 0 ? href : '#' + (href === '/' ? '' : href));
        return;
      }
    }

    var viewBtn = e.target.closest('[data-action="view"]');
    if (viewBtn) {
      e.preventDefault();
      var jobId = viewBtn.getAttribute('data-job-id');
      var jobs = getJobs();
      var job = jobs.find(function (j) { return j.id === jobId; });
      if (job) openModal(job);
      return;
    }

    var saveBtn = e.target.closest('button[data-action="save"]');
    if (saveBtn && !saveBtn.disabled) {
      e.preventDefault();
      e.stopPropagation();
      var id = saveBtn.getAttribute('data-job-id');
      if (id) {
        saveJob(id);
        if (getPath() === '/dashboard') updateDashboardJobs();
      }
      return;
    }

    var removeBtn = e.target.closest('[data-action="remove"]');
    if (removeBtn) {
      e.preventDefault();
      var id = removeBtn.getAttribute('data-job-id');
      unsaveJob(id);
      if (getPath() === '/saved') render();
      return;
    }

    var closeModalBtn = e.target.closest('[data-action="close-modal"]');
    if (closeModalBtn) {
      e.preventDefault();
      closeModal();
    }
  }

  function closeNavDropdown() {
    var dropdown = document.getElementById('nav-dropdown');
    var btn = document.getElementById('nav-menu-btn');
    if (dropdown) dropdown.classList.remove('is-open');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
    }
  }

  function toggleNavDropdown() {
    var dropdown = document.getElementById('nav-dropdown');
    var btn = document.getElementById('nav-menu-btn');
    if (!dropdown || !btn) return;
    var isOpen = dropdown.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    dropdown.setAttribute('aria-hidden', !isOpen);
  }

  function init() {
    if (!window.location.hash) window.location.hash = '#/';
    render();
    document.addEventListener('click', handleClick);
    window.addEventListener('hashchange', render);
    window.addEventListener('popstate', render);

    var menuBtn = document.getElementById('nav-menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleNavDropdown();
      });
    }

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.ds-nav')) closeNavDropdown();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
