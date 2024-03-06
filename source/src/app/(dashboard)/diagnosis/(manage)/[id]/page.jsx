import DiagnosisForm from "@/src/components/form/DiagnosisForm";

export const metadata = {
   title: 'Edit Diagnosa',
   description: 'Welcome to Next.js',
};

const ManageDiagnosisPage = ({ params }) => {
   return (
      <DiagnosisForm params={params} />
   );
};

export default ManageDiagnosisPage;
