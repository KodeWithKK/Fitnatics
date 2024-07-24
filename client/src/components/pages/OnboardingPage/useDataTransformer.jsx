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

  const tProfessionalDetails = useMemo(() => {
    return data.trainerData.professionalDetails;
  }, [data.trainerData.professionalDetails]);

  const setMPersonalDetails = useCallback(
    (value) => {
      const nextData = produce(data, (draftState) => {
        draftState.memberData.personalDetails = {
          ...draftState.memberData.personalDetails,
          ...value,
        };
      });
      setData(nextData);
    },
    [data, setData],
  );

  const setMGymOutlet = useCallback(
    (value) => {
      const nextData = produce(data, (draftState) => {
        draftState.memberData.gymOutlet = value;
      });
      setData(nextData);
    },
    [data, setData],
  );

  const setTPersonalDetails = useCallback(
    (value) => {
      const nextData = produce(data, (draftState) => {
        draftState.trainerData.personalDetails = {
          ...draftState.trainerData.personalDetails,
          ...value,
        };
      });
      setData(nextData);
    },
    [data, setData],
  );

  const setTProfessionalDetails = useCallback(
    (value) => {
      const nextData = produce(data, (draftState) => {
        draftState.trainerData.professionalDetails = {
          ...draftState.trainerData.professionalDetails,
          ...value,
        };
      });
      setData(nextData);
    },
    [data, setData],
  );

  return {
    navItems,
    mData,
    mPersonalDetails,
    mGymOutlet,
    tPersonalDetails,
    tProfessionalDetails,
    setMPersonalDetails,
    setMGymOutlet,
    setTPersonalDetails,
    setTProfessionalDetails,
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
    title: "Professional Details",
    description: "Enter your professional details",
  },
  { title: "Submit Form", description: "Submit form" },
];

export default useDataTransformer;
