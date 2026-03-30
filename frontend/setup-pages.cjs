const fs = require('fs');
const path = require('path');

const pages = [
  'src/pages/Landing.jsx',
  'src/pages/auth/Login.jsx',
  'src/pages/auth/Register.jsx',
  'src/layouts/StudentLayout.jsx',
  'src/layouts/StaffLayout.jsx',
  'src/layouts/AdminLayout.jsx',
  'src/pages/student/Dashboard.jsx',
  'src/pages/student/Fees.jsx',
  'src/pages/student/Complaints.jsx',
  'src/pages/student/Profile.jsx',
  'src/pages/student/LeaveApplication.jsx',
  'src/pages/staff/Dashboard.jsx',
  'src/pages/staff/Tasks.jsx',
  'src/pages/admin/Dashboard.jsx',
  'src/pages/admin/Students.jsx'
];

pages.forEach(file => {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const componentName = path.basename(file, '.jsx');
  let content = `export default function ${componentName}() {\n  return <div>${componentName}</div>\n}\n`;
  
  // Custom content for Layouts
  if (file.includes('Layout')) {
    content = `import { Outlet } from 'react-router-dom'\n\nexport default function ${componentName}() {\n  return (\n    <div className="flex min-h-screen w-full flex-col bg-muted/40">\n      <Outlet />\n    </div>\n  )\n}\n`;
  }
  
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content);
  }
});

console.log('Pages created!');
