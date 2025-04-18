import { Profile } from '@/types/profile.types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, BookOpen, Building, Link } from 'lucide-react';
import BasicInfoTab from '@/components/profile/BasicInfoTab';
import EducationTab from '@/components/profile/EducationTab';
import ExperienceTab from '@/components/profile/ExperienceTab';
import LinksTab from '@/components/profile/LinksTab';

// Sub-component for the profile form to avoid duplication
interface ProfileFormProps {
  profile: Profile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleSubmit: (values: Profile) => Promise<void>;
  handleResumeUpload: (file: File) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isUploading: boolean;
}

const ProfileValidationSchema = Yup.object().shape({
bio: Yup.string().required('Bio is required'),
skills: Yup.array().of(Yup.string()).min(1, 'Add at least one skill'),
education: Yup.array().of(
    Yup.object().shape({
    institution: Yup.string().required('Institution is required'),
    degree: Yup.string().required('Degree is required'),
    fieldOfStudy: Yup.string().required('Field of study is required'),
    startDate: Yup.string().required('Start date is required'),
    isCurrent: Yup.boolean().default(false),
    endDate: Yup.string().when('isCurrent', {
        is: false,
        then: (schema) => schema.required('End date is required'),
        otherwise: (schema) => schema.notRequired()
    })
    })
),
experience: Yup.array().of(
    Yup.object().shape({
    company: Yup.string().required('Company is required'),
    position: Yup.string().required('Position is required'),
    description: Yup.string().required('Description is required'),
    startDate: Yup.string().required('Start date is required'),
    isCurrent: Yup.boolean().default(false),
    endDate: Yup.string().when('isCurrent', {
        is: false,
        then: (schema) => schema.required('End date is required'),
        otherwise: (schema) => schema.notRequired()
    })
    })
),
linkedInUrl: Yup.string().url('Must be a valid URL'),
githubUrl: Yup.string().url('Must be a valid URL'),
portfolioUrl: Yup.string().url('Must be a valid URL'),
});

const ProfileForm = ({ 
  profile, 
  activeTab, 
  setActiveTab, 
  handleSubmit, 
  handleResumeUpload,
  isCreating,
  isUpdating,
  isUploading
}: ProfileFormProps) => {
return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
    <TabsList className="w-full mb-8">
        <TabsTrigger value="info" className="text-xs sm:text-sm md:text-base flex-1 whitespace-nowrap">
        <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        <span>Basic Info</span>
        </TabsTrigger>
        <TabsTrigger value="education" className="text-xs sm:text-sm md:text-base flex-1 whitespace-nowrap">
        <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        <span>Education</span>
        </TabsTrigger>
        <TabsTrigger value="experience" className="text-xs sm:text-sm md:text-base flex-1 whitespace-nowrap">
        <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        <span>Experience</span>
        </TabsTrigger>
        <TabsTrigger value="links" className="text-xs sm:text-sm md:text-base flex-1 whitespace-nowrap">
        <Link className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        <span>Links & Resume</span>
        </TabsTrigger>
    </TabsList>

    <Formik
        initialValues={profile}
        validationSchema={ProfileValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
    >
        {(formik) => (
        <Form className="space-y-6">
            <TabsContent value="info" className="mt-0">
            <BasicInfoTab
                formik={formik}
                isSaving={isCreating || isUpdating}
                onTabChange={setActiveTab}
            />
            </TabsContent>

            <TabsContent value="education" className="mt-0">
            <EducationTab
                formik={formik}
                isSaving={isCreating || isUpdating}
                onTabChange={setActiveTab}
            />
            </TabsContent>

            <TabsContent value="experience" className="mt-0">
            <ExperienceTab
                formik={formik}
                isSaving={isCreating || isUpdating}
                onTabChange={setActiveTab}
            />
            </TabsContent>

            <TabsContent value="links" className="mt-0">
            <LinksTab
                formik={formik}
                isSaving={isCreating || isUpdating}
                onTabChange={setActiveTab}
                onResumeUpload={handleResumeUpload}
                isResumeUploading={isUploading}
            />
            </TabsContent>
        </Form>
        )}
    </Formik>
    </Tabs>
)};

  export default ProfileForm;