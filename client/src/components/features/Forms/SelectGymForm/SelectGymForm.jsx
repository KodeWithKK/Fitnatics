import { useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { GettingStartedContext } from "@pages/GettingStartedPage/GettingStartedPage";
import GymCard from "./GymCard";
import SteperLayout from "@layouts/SteperFormLayout/SteperLayout";

const SelectGymForm = () => {
  const { addToast } = useContext(GlobalContext);
  const {
    setStep,
    memberGymOutlet: selectedGym,
    setMemberGymOutlet: setSelectedGym,
  } = useContext(GettingStartedContext);

  return (
    <SteperLayout.Form
      onSubmit={(e) => {
        e.preventDefault();

        if (!selectedGym) {
          addToast(
            "warning",
            "Select a Gym!",
            "Select a gym to proceed to the next step"
          );
        } else {
          setStep((prevStep) => ++prevStep);
        }
      }}
    >
      <div className="flex justify-center items-center gap-3 p-6 h-full">
        <GymCard
          gymCity="Noida"
          imgSrc="images/Noida Gym.jpeg"
          location="Sector 49"
          contactNo="8692451702"
          selected={selectedGym === "Noida"}
          setSelectedGym={setSelectedGym}
        />
        <GymCard
          gymCity="Prayagraj"
          imgSrc="images/Prayagraj Gym.jpeg"
          location="Preetam Nagar"
          contactNo="8892451608"
          selected={selectedGym === "Prayagraj"}
          setSelectedGym={setSelectedGym}
        />
      </div>
    </SteperLayout.Form>
  );
};

export default SelectGymForm;
