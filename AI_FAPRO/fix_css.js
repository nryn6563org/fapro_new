const fs = require('fs');
const files = [
  '/Users/nryn6563/WorkSpace/FAPRO_NEW/ai_fapro/assets/css/pages/issues/IssueProposalModal/IssueProposalModal.css',
  '/Users/nryn6563/WorkSpace/FAPRO_NEW/ai_fapro/assets/css/pages/clients/SmartOnboardingModal/SmartOnboardingModal.css',
  '/Users/nryn6563/WorkSpace/FAPRO_NEW/ai_fapro/assets/css/pages/strategic-stocks/StrategicProposalModal/StrategicProposalModal.css',
  '/Users/nryn6563/WorkSpace/FAPRO_NEW/ai_fapro/assets/css/pages/clients/ClientInfoModal/ClientInfoModal.css'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Create a regex for the ID prefix based on the file contents
  // E.g., #smart-onboarding-modal, #issue-proposal-modal, #strategic-proposal-modal, #client-info-modal
  content = content.replace(/#(smart-onboarding|issue-proposal|strategic-proposal|client-info)-modal\s+>\s+\./g, '.');
  content = content.replace(/#(smart-onboarding|issue-proposal|strategic-proposal|client-info)-modal\s+\./g, '.');
  
  fs.writeFileSync(file, content);
});
console.log('Done replacing prefixes.');
