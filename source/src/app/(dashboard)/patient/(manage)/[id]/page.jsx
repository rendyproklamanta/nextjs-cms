import PatientForm from "@/src/components/form/PatientForm";

export const metadata = {
   title: 'Edit Pasien',
   description: 'Welcome to Next.js',
};

const ManagePatientPage = ({ params }) => {
   return (
      <PatientForm params={params} />
   );
};

export default ManagePatientPage;
