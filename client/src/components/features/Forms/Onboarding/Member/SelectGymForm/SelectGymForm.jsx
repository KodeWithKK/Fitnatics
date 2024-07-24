import { useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";
import OnboardingForm from "@layouts/OnboardingPageLayout/OnboardingForm";
import GymCard from "./GymCard";

const SelectGymForm = () => {
  const { addToast } = useContext(GlobalContext);
  const {
    setStep,
    mGymOutlet: selectedGym,
    setMGymOutlet: setSelectedGym,
  } = useContext(OnboardingContext);

  return (
    <OnboardingForm
      className={"flex flex-col items-center justify-center"}
      onSubmit={(e) => {
        e.preventDefault();

        if (!selectedGym) {
          addToast(
            "warning",
            "Select a Gym!",
            "Select a gym to proceed to the next step",
          );
        } else {
          setStep((prevStep) => ++prevStep);
        }
      }}
    >
      <OnboardingForm.Headline
        className={"mb-4 mt-6"}
        style={{ width: "calc(292px * 2 + 12px)" }}
      />

      <div className="flex h-full items-center justify-center gap-3 p-6 pt-0">
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
    </OnboardingForm>
  );
};

export default SelectGymForm;
