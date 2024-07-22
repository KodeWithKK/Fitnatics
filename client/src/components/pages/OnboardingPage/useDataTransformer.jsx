import { useMemo, useCallback } from "react";
import { produce } from "immer";

const memberNavItems = [
  { title: "Personal Details", description: "Enter your personal details" },
  { title: "Verify Email", description: "Verify your Email" },
  { title: "Select a Gym", description: "Select a Gym" },
  { title: "Choose Plan", description: "Choose a membership plan" },
];

function useDataTransformer({ role, data, setData, isEmailVerifiedInitially }) {
  const navItems = useMemo(() => {
    if (role == "member") {
      return memberNavItems.filter((navItem) => {
        return isEmailVerifiedInitially
          ? navItem.title != "Verify Email"
          : true;
      });
    }
    return [];
  }, [isEmailVerifiedInitially, role]);

  const memberData = useMemo(() => data.memberData, [data]);

  const memberGymOutlet = useMemo(() => {
    return data.memberData?.gymOutlet;
  }, [data]);

  const setMemberData = useCallback(
    (formData) => {
      const nextData = produce(data, (draftState) => {
        draftState.memberData = { ...draftState.memberData, ...formData };
      });
      setData(nextData);
    },
    [data, setData]
  );

  const setMemberGymOutlet = useCallback(
    (value) => {
      const nextData = produce(data, (draftState) => {
        draftState.memberData.gymOutlet = value;
      });
      setData(nextData);
    },
    [data, setData]
  );

  return {
    navItems,
    memberData,
    memberGymOutlet,
    setMemberData,
    setMemberGymOutlet,
  };
}

export default useDataTransformer;
