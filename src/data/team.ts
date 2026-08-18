import type { TeamMember } from "../types";

export const facultyCoordinator = {
  name: "Dr. R. Seyezhai",
  degrees: "B.E., M.E., Ph.D",
  title: "Professor",
  department: "Department of Electrical and Electronics Engineering",
  email: "seyezhair@ssn.edu.in",
  photo: "/faculty_seyezhai.png",
};

export const team: TeamMember[] = [
  // Faculty Coordinator
  {
    id: "seyezhai-r",
    name: "Dr. R. Seyezhai",
    role: "Professor, Department of Electrical and Electronics Engineering",
    category: "Faculty Coordinator",
    photo: "/faculty_seyezhai.png",
    email: "seyezhair@ssn.edu.in",
    linkedin: "",
  },

  // Office Bearers
  {
    id: "chindhana-k",
    name: "Chindhana K",
    role: "Chair Person",
    category: "Office Bearers",
    department: "EEE, 4th Year",
    photo: "/team-photos/OFFICE BEARERS/Chindhana K_EEE_4thyear.jpg",
    linkedin: "",
  },
  {
    id: "harvin-vardhan",
    name: "Harvin Vardhan Chevanthi Sundar",
    role: "Vice Chair Person",
    category: "Office Bearers",
    department: "EEE, 4th Year",
    photo: "/team-photos/OFFICE BEARERS/Harvin_Vardhan_EEE_4th_year.jpg",
    linkedin: "",
  },
  {
    id: "kathirvel",
    name: "Kathirvel V",
    role: "Secretary",
    category: "Office Bearers",
    department: "EEE, 4th Year",
    photo: "/team-photos/OFFICE BEARERS/Kathirvel_EEE_4th year.jpg",
    linkedin: "",
  },
  {
    id: "kalyani",
    name: "Kalyani M B",
    role: "Treasurer",
    category: "Office Bearers",
    department: "EEE, 4th Year",
    photo: "/team-photos/OFFICE BEARERS/Kalyani_EEE_4th year.jpeg",
    linkedin: "",
  },
  {
    id: "kishore-r",
    name: "Kishore R",
    role: "Project Chair",
    category: "Office Bearers",
    department: "ECE, 4th Year",
    photo: "/team-photos/OFFICE BEARERS/R.Kishore_ECE_4th year.jpg",
    linkedin: "",
  },
  {
    id: "sanjaynath",
    name: "Sanjaynath V",
    role: "Joint Secretary",
    category: "Office Bearers",
    department: "EEE, 3rd Year",
    photo: "/team-photos/OFFICE BEARERS/Sanjaynath _EEE_3rd year.jpg",
    linkedin: "",
  },
  {
    id: "boobesh-i-r",
    name: "Boobesh I R",
    role: "Joint Secretary",
    category: "Office Bearers",
    department: "EEE, 3rd Year",
    photo: "/team-photos/OFFICE BEARERS/Boobesh_IR_3rdyear_EEE.jpg",
    linkedin: "",
  },

  // Project Team
  { id: "keerthi-sheevani", name: "Keerthi Sheevani G", role: "Lead", category: "Project Team", department: "EEE, 4th Year", photo: "/team-photos/TECHNICAL/Keerthi Sheevani_EEE_4thyear.jpg", linkedin: "" },
  { id: "gowri-shankara-narayanan", name: "Gowri Shankara Narayanan A", role: "Lead", category: "Project Team", department: "EEE, 4th Year", photo: "/team-photos/TECHNICAL/Gowri_Shankara_Narayanan_EEE_4th_yr.png", linkedin: "" },
  { id: "shivashankar", name: "Shivashankar P", role: "Lead", category: "Project Team", department: "ECE, 2nd Year", photo: "/team-photos/TECHNICAL/SHIVASHANKAR_ECE_2nd_year.jpeg", linkedin: "" },
  { id: "jeffi-majala-f", name: "Jeffi", role: "Lead", category: "Project Team", department: "EEE, 4th Year", photo: "/team-photos/TECHNICAL/JEFFI MAJALA F  4th year EEE.jpg", linkedin: "" },
  { id: "nandhini", name: "Nandhini S", role: "Lead", category: "Project Team", department: "EEE, 4th Year", photo: "/team-photos/TECHNICAL/Nandhini_EEE_4th_year.jpg", linkedin: "" },
  { id: "goutham-g", name: "Goutham G", role: "Member", category: "Project Team", department: "ECE, 3rd Year", photo: "/team-photos/TECHNICAL/Goutham_ECE_3.jpg", email: "goutham2410102@ssn.edu.in", linkedin: "" },
  { id: "vennela-srpns-tech", name: "Vennela SRPNS", role: "Member", category: "Project Team", department: "EEE, 3rd Year", photo: "/team-photos/TECHNICAL/Vennela_SRPNS_EEE_3rdyear.jpg", email: "vennela2410199@ssn.edu.in", linkedin: "" },
  { id: "nithesh-kumar", name: "K. Nithesh Kumar", role: "Member", category: "Project Team", department: "EEE, 3rd Year", photo: "/team-photos/TECHNICAL/K.NITHESH KUMAR EEE 3rd Year.jpg", email: "nitheshkumar2410764@ssn.edu.in", linkedin: "" },
  { id: "thanuj-s", name: "Thanuj S", role: "Member", category: "Project Team", photo: "/team-photos/TECHNICAL/Thanuj_EEE_3rdyear.jpeg", email: "thanuj2410277@ssn.edu.in", linkedin: "" },
  { id: "aravind-krishna", name: "Aravind Krishna", role: "Member", category: "Project Team", department: "ECE, 3rd Year", photo: "team-photos/TECHNICAL/Aravind_ECE_3.jpg", email: "aravindkrishna2410111@ssn.edu.in", linkedin: "" },
  { id: "shakthivel-r", name: "Shakthivel R", role: "Member", category: "Project Team", department: "ECE, 3rd Year", photo: "/team-photos/TECHNICAL/Shakthivel_R_ECE_3rdyr.png", email: "shakthivel2410515@ssn.edu.in", linkedin: "" },
  { id: "muthu-palaniyappan", name: "Muthu Palaniyappan MV", role: "Member", category: "Project Team", photo: "/team-photos/TECHNICAL/Muthu Palaniyappan_EEE_2ndyear.jpg", email: "muthupalaniyappan2510287@ssn.edu.in", linkedin: "" },
  { id: "kishore-m", name: "M.Kishore", role: "Member", category: "Project Team", photo: "/team-photos/TECHNICAL/Kishore_EEE_2ndyear.jpg", email: "kishore2510503@ssn.edu.in", linkedin: "" },
  { id: "lokesh-k", name: "Lokesh K", role: "Member", category: "Project Team", department: "ECE, 2nd Year", photo: "/team-photos/TECHNICAL/Lokesh_K_ECE_IInd_Yr.jpg", email: "lokesh2510488@ssn.edu.in", linkedin: "" },
  { id: "vanavan-u", name: "Vanavan U", role: "Member", category: "Project Team", department: "EEE, 3rd Year", photo: "/team-photos/TECHNICAL/Vanavan_EEE_3rdYear.jpeg", email: "vanavan2410939@ssn.edu.in", linkedin: "" },
  { id: "aishwarya-l", name: "Aishwarya L", role: "Member", category: "Project Team", department: "ECE, 2nd Year", photo: "/team-photos/TECHNICAL/Aishwarya L_ECE_II.jpg", linkedin: "" },
  { id: "avinash-r-tech", name: "Avinash R", role: "Member", category: "Project Team", department: "EEE, 3rd Year", photo: "/team-photos/TECHNICAL/Avinash_R EEE 3rd year.jpg", linkedin: "" },
  { id: "deepthi-anand", name: "Deepthi Anand", role: "Member", category: "Project Team", department: "EEE, 3rd Year", photo: "/team-photos/TECHNICAL/Deepthi_Anand EEE 3rd year.jpg", linkedin: "" },
  { id: "shobana", name: "Shobana S", role: "Member", category: "Project Team", department: "EEE, 3rd Year", photo: "/team-photos/TECHNICAL/Shobana_EEE_3rd_yr.jpg", linkedin: "" },
  { id: "surya", name: "Surya SS", role: "Member", category: "Project Team", department: "ECE, 2nd Year", photo: "/team-photos/TECHNICAL/Surya_ECE_2nd year.jpg", linkedin: "" },

  // Content Team
  { id: "haripriya-v-h", name: "Haripriya V H", role: "Head", category: "Content Team", department: "ECE, 3rd Year", photo: "/team-photos/EDITORIAL/Haripriya V H_ECE_III.jpeg", email: "haripriya2410746@ssn.edu.in", linkedin: "" },
  { id: "c-preethi", name: "C.Preethi", role: "Member", category: "Content Team", department: "CSE, 3rd Year", photo: "/team-photos/EDITORIAL/Preethi_CSE_3rd.jpg", email: "preethi2410429@ssn.edu.in", linkedin: "" },
  { id: "petchiammal-devi", name: "R. Petchiammal Devi", role: "Member", category: "Content Team", department: "CSE, 3rd Year", photo: "/team-photos/EDITORIAL/Petchiammal Devi R_CSE_3rd year.jpg", email: "petchiammal2410537@ssn.edu.in", linkedin: "" },
  { id: "baraniidharan-rv", name: "Baraniidharan RV", role: "Member", category: "Content Team", photo: "/team-photos/EDITORIAL/Baraniidharan RV_EEE dept_2nd year.jpg", email: "baraniidharan2510998@ssn.edu.in", linkedin: "" },
  { id: "sakthi-vijayalakshmi", name: "S Sakthi Vijayalakshmi", role: "Member", category: "Content Team", department: "EEE, 2nd Year", photo: "/team-photos/EDITORIAL/S Sakthi Vijayalakshmi _ EEE _ 2nd year.jpg", email: "sakthivijayalakshmi2511090@ssn.edu.in", linkedin: "" },

  // Design Team
  { id: "deeksha-srinivasan", name: "Deeksha Srinivasan", role: "Head", category: "Design Team", department: "EEE, 3rd Year", photo: "/team-photos/DESIGN/Deeksha_EEE_3rdyear.jpg", email: "deeksha2410298@ssn.edu.in", linkedin: "" },
  { id: "avanthika-v", name: "Avanthika V", role: "Member", category: "Design Team", department: "M.Tech (Integrated) CSE, 3rd Year", photo: "/team-photos/DESIGN/Avanthika_MtechCSE_III.png", email: "avanthika2470011@ssn.edu.in", linkedin: "" },
  { id: "pritika", name: "Pritika", role: "Member", category: "Design Team", department: "EEE, 2nd Year", photo: "/team-photos/DESIGN/PRITIKA.EEE.2ND YEAR.jpeg", email: "devaharshaa2510482@ssn.edu.in", linkedin: "" },
  { id: "carolin-r", name: "Carolin R", role: "Member", category: "Design Team", department: "ECE, 2nd Year", photo: "/team-photos/DESIGN/Carolin R_ECE_2nd year.jpg", email: "carolin2510492@ssn.edu.in", linkedin: "" },
  { id: "sasikiran-s-l", name: "Sasikiran S L", role: "Member", category: "Design Team", department: "Chemical Engineering, 2nd Year", photo: "/team-photos/DESIGN/Sasikiran S L_Chemical engineering_2nd year.png", linkedin: "" },

  // Event Management
  { id: "viya-balaji", name: "Viya Balaji", role: "Head", category: "Event Management", department: "EEE, 3rd Year", photo: "/team-photos/EVENT MANAGEMENT/Viya Balaji - EEE 3rd year.jpg", email: "viya2410190@ssn.edu.in", linkedin: "" },
  { id: "deepalakshmi-m", name: "Deepalakshmi M", role: "Head", category: "Event Management", department: "EEE, 3rd Year", photo: "/team-photos/EVENT MANAGEMENT/Deepalakshmi_EEE_3rdyr.jpg", email: "deepalakshmi2410550@ssn.edu.in", linkedin: "" },
  { id: "yazhissai-k-p", name: "Yazhissai K P", role: "Member", category: "Event Management", department: "EEE, 3rd Year", photo: "/team-photos/EVENT MANAGEMENT/Yazhissai K P_EEE_3rdyear.jpg", email: "yazhissai2410417@ssn.edu.in", linkedin: "" },
  { id: "vennela-srpns", name: "Vennela SRPNS", role: "Member", category: "Event Management", department: "EEE, 3rd Year", photo: "/team-photos/EVENT MANAGEMENT/Vennela_SRPNS_EEE_3rdyear.jpg", email: "vennela2410199@ssn.edu.in", linkedin: "" },
  { id: "kritheesh-r", name: "Kritheesh.R", role: "Member", category: "Event Management", photo: "/team-photos/EVENT MANAGEMENT/R_Kritheesh_EEE_2ND_YEAR.jpg", email: "kritheesh2510295@ssn.edu.in", linkedin: "" },
  { id: "lakshith-naren", name: "Lakshith naren.S", role: "Member", category: "Event Management", photo: "/team-photos/EVENT MANAGEMENT/Lakshithnaren_EEE_2nd year.jpg", email: "lakshithnaren2510271@ssn.edu.in", linkedin: "" },
  { id: "avinash-r", name: "Avinash R", role: "Member", category: "Event Management", department: "EEE, 3rd Year", photo: "/team-photos/EVENT MANAGEMENT/Avinash R EEE 3rd year.jpg", linkedin: "" },

  // Social Media & Marketing
  { id: "avantheka-sreenivasan", name: "Avantheka Sreenivasan", role: "Head", category: "Social Media & Marketing", photo: "/team-photos/SOCIAL MEDIA AND PR/Avantheka_CSE_3rdYear/DSC03441.JPG", email: "avantheka2410542@ssn.edu.in", linkedin: "" },
  { id: "mirthika-s", name: "Mirthika S", role: "Head", category: "Social Media & Marketing", department: "EEE, 2nd Year", photo: "/team-photos/SOCIAL MEDIA AND PR/Mirthika _EEE_3rd year.jpg", email: "mirthika2410695@ssn.edu.in", linkedin: "" },
  { id: "kavitha-rosalin", name: "Kavitha Rosalin J", role: "Member", category: "Social Media & Marketing", photo: "/team-photos/SOCIAL MEDIA AND PR/Kavitha_Rosalin_CSE_3rdYEAR/IMG_20260707_225343.jpg", email: "kavitharosalin2410547@ssn.edu.in", linkedin: "" },
  { id: "sujitha-c-b", name: "Sujitha C B", role: "Member", category: "Social Media & Marketing", department: "CSE, 3rd Year", photo: "/team-photos/SOCIAL MEDIA AND PR/Sujitha_CSE_3rdyear.JPG", email: "sujitha2410543@ssn.edu.in", linkedin: "" },
  { id: "paramjeeth", name: "Paramjeeth", role: "Member", category: "Social Media & Marketing", photo: "/team-photos/SOCIAL MEDIA AND PR/Paramjeeth_EEE_2ndYear.jpg", email: "paramjeeth2510538@ssn.edu.in", linkedin: "" },
  { id: "sakthimurugan-k", name: "Sakthimurugan K", role: "Member", category: "Social Media & Marketing", photo: "/team-photos/SOCIAL MEDIA AND PR/Sakthimurugan_EEE_2nd year/WhatsApp Image 2026-06-27 at 12.14.30.jpeg", email: "sakthimurugan2510536@ssn.edu.in", linkedin: "" },
  { id: "karthikeyan-u", name: "Karthikeyan", role: "Member", category: "Social Media & Marketing", department: "EEE, 3rd Year", photo: "/team-photos/SOCIAL MEDIA AND PR/Karthikeyan_U_3rd_year_EEE/1000119190 (1).jpg", linkedin: "" },
  { id: "naveenraj-k", name: "Naveen", role: "Member", category: "Social Media & Marketing", department: "EEE, 2nd Year", photo: "/team-photos/SOCIAL MEDIA AND PR/NAVEENRAJ K _ EEE _ II yr..jpg", linkedin: "" },
  { id: "rakshana", name: "Rakshana", role: "Member", category: "Social Media & Marketing", department: "EEE, 3rd Year", photo: "/team-photos/SOCIAL MEDIA AND PR/Rakshana_EEE_3rdyear.jpg", linkedin: "" },

  // Web Development
  { id: "sivasarathy-a", name: "Sivasarathy A", role: "Head", category: "Web Development", department: "CSE, 3rd Year", photo: "/team-photos/WEBMASTERS AND TECHNICAL/Sivasarathy A_CSE_3rd_Year.jpg", email: "sivasarathy2410583@ssn.edu.in", linkedin: "" },
  { id: "sree-harini-r", name: "Sree Harini R", role: "Member", category: "Web Development", department: "CSE, 3rd Year", photo: "/team-photos/WEBMASTERS AND TECHNICAL/Sree Harini R_CSE_3rdYear.jpeg", email: "sreeharini2410178@ssn.edu.in", linkedin: "" },
  { id: "subhiksha-g", name: "Subhiksha G", role: "Member", category: "Web Development", department: "CSE, 3rd Year", photo: "/team-photos/WEBMASTERS AND TECHNICAL/Subhiksha G_CSE_3rdYear.jpeg", email: "subhiksha2410492@ssn.edu.in", linkedin: "" },
  { id: "mithin-krishna-ps", name: "Mithin Krishna P S", role: "Member", category: "Web Development", department: "IT, 2nd Year", photo: "/team-photos/WEBMASTERS AND TECHNICAL/Mithin Krishna_IT_2ndYear.png", email: "mithinkrishna2510417@ssn.edu.in", linkedin: "" },
];
