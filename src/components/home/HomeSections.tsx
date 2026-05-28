"use client";

import { HeroSection } from "./HeroSection";
import { BrandStory } from "./BrandStory";
import { SignatureFoods } from "./SignatureFoods";
import { ExperienceSection } from "./ExperienceSection";
import { SignatureDrinks } from "./SignatureDrinks";
import { ChefSection } from "./ChefSection";
import { SocialProof } from "./SocialProof";
import { ReservationCTA } from "./ReservationCTA";

export function HomeSections() {
  return (
    <>
      <HeroSection />
      <BrandStory />
      <SignatureFoods />
      <ExperienceSection />
      <SignatureDrinks />
      <ChefSection />
      <SocialProof />
      <ReservationCTA />
    </>
  );
}
