import { useMemo, useCallback } from "react";
import { produce } from "immer";

function useDataTransformer({ role, data, setData, isEmailVerifiedInitially }) {
  const navItems = useMemo(() => {
    if (role == "member") {
      return memberNavItems.filter((navItem) => {
        return isEmailVerifiedInitially
          ? navItem.title != "Verify Email"
          : true;
      });
    }
    return trainerNavItems.filter((navItem) => {
      return isEmailVerifiedInitially ? navItem.title != "Verify Email" : true;
    });
  }, [isEmailVerifiedInitially, role]);

  const mData = useMemo(() => data.memberData, [data.memberData]);

  const mPersonalDetails = useMemo(() => {
    return data.memberData.personalDetails;
  }, [data.memberData.personalDetails]);

  const mGymOutlet = useMemo(() => {
    return data.memberData.gymOutlet;
  }, [data]);

  const tPersonalDetails = useMemo(() => {
    return data.trainerData.personalDetails;
  }, [data.trainerData.personalDetails]);

  const tEducationalDetails = useMemo(() => {
    return data.trainerData.educationalDetails;
  }, [data.trainerData.educationalDetails]);

  const setMPersonalDetails = useCallback(
    (value) => {
      setData(
        produce((draftState) => {
          draftState.memberData.personalDetails = value;
        }),
      );
    },
    [setData],
  );

  const setMGymOutlet = useCallback(
    (value) => {
      setData(
        produce((draftState) => {
          draftState.memberData.gymOutlet = value;
        }),
      );
    },
    [setData],
  );

  const setTPersonalDetails = useCallback(
    (value) => {
      setData(
        produce((draftState) => {
          draftState.trainerData.personalDetails = value;
        }),
      );
    },
    [setData],
  );

  const setTEducationalDetails = useCallback(
    (value) => {
      setData(
        produce((draftState) => {
          draftState.trainerData.educationalDetails = value;
        }),
      );
    },
    [setData],
  );

  return {
    navItems,
    mData,
    mPersonalDetails,
    mGymOutlet,
    tPersonalDetails,
    tEducationalDetails,
    setMPersonalDetails,
    setMGymOutlet,
    setTPersonalDetails,
    setTEducationalDetails,
  };
}

const memberNavItems = [
  { title: "Personal Details", description: "Enter your personal details" },
  { title: "Verify Email", description: "Verify Email" },
  { title: "Select a Gym", description: "Select a Gym" },
  { title: "Choose Plan", description: "Choose a membership plan" },
];

const trainerNavItems = [
  { title: "Personal Details", description: "Enter your personal details" },
  { title: "Verify Email", description: "Verify Email" },
  {
    title: "Educational Details",
    description: "Enter your educational details",
  },
  { title: "Upload Certifcates", description: "Upload Essential Certifcates" },
  {
    title: "Work Experience",
    description: "Enter your work experience details",
  },
  {
    title: "Specializations & Skills",
    description: "Enter specializations and skills details",
  },
  {
    title: "Other Professional Details",
    description: "Enter other professional details",
  },
];

export default useDataTransformer;
