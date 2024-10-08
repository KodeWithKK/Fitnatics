import { useState, useEffect } from "react";
import { produce } from "immer";
import useApiManager from "./useApiManager";
import useDataTransformer from "./useDataTransformer";

function useOnboardingPageHooks() {
  const [step, setStep] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpGeneratedAt, setOtpGeneratedAt] = useState(null);
  const [role, setRole] = useState("member");
  const [data, setData] = useState({
    memberData: {
      personalDetails: {},
      gymOutlet: "",
    },
    trainerData: {
      personalDetails: {},
      educationalDetails: {},
      certificates: [
        {
          nameOfCertification: "",
          certifyingBody: "",
          certifiationDate: "",
          expirationDate: "",
          certificate: null,
        },
      ],
      workExperience: [
        {
          jobTitle: "",
          gymOrStudioName: "",
          employedFrom: "",
          employedTo: "",
          breifJobDescription: "",
        },
      ],
      specializationsAndSkills: {},
      otherProfessionalDetails: {},
    },
  });

  const {
    fetchedUserData,
    isEmailVerifiedInitially,
    isLoading,
    membershipPlans,
    isSetupAccountPending,
    setupAccountHandler,
  } = useApiManager({ role, data });

  useEffect(() => {
    setData((prevData) => {
      const nextData = produce(prevData, (draftState) => {
        draftState.memberData.personalDetails = {
          ...draftState.memberData.personalDetails,
          ...fetchedUserData,
        };

        draftState.trainerData.personalDetails = {
          ...draftState.trainerData.personalDetails,
          ...fetchedUserData,
        };
      });
      return nextData;
    });
  }, [fetchedUserData]);

  useEffect(() => {
    if (isEmailVerifiedInitially) {
      setIsEmailVerified(true);
    }
  }, []); // eslint-disable-line

  const {
    navItems,
    mPersonalDetails,
    mGymOutlet,
    tPersonalDetails,
    tEducationalDetails,
    tCertificates,
    tWorkExperiences,
    setMPersonalDetails,
    setMGymOutlet,
    setTPersonalDetails,
    setTEducationalDetails,
    setTCertificates,
    setTWorkExperiences,
  } = useDataTransformer({
    role,
    data,
    setData,
    isEmailVerifiedInitially,
  });

  return {
    step,
    role,
    navItems,
    isLoading,
    membershipPlans,
    isEmailVerifiedInitially,
    isEmailVerified,
    otpGeneratedAt,
    mPersonalDetails,
    mGymOutlet,
    tPersonalDetails,
    tEducationalDetails,
    tCertificates,
    tWorkExperiences,
    isSetupAccountPending,
    setStep,
    setRole,
    setIsEmailVerified,
    setOtpGeneratedAt,
    setMPersonalDetails,
    setMGymOutlet,
    setTPersonalDetails,
    setTEducationalDetails,
    setTCertificates,
    setTWorkExperiences,
    setupAccountHandler,
  };
}

export default useOnboardingPageHooks;
