"use client";

import { IntroLoader } from "@/components/layout/IntroLoader";
import { HeroSection } from "./HeroSection";
import { BrandStory } from "./BrandStory";
import { FoodZoomTransition } from "./FoodZoomTransition";
import { SignatureFoods } from "./SignatureFoods";
import { ExperienceSection } from "./ExperienceSection";
import { SignatureDrinks } from "./SignatureDrinks";
import { ChefSection } from "./ChefSection";
import { SocialProof } from "./SocialProof";
import { ReservationCTA } from "./ReservationCTA";

export function HomeSections() {
  return (
    <IntroLoader>
      <HeroSection />
      <BrandStory />
      <FoodZoomTransition />
      <SignatureFoods />
      <ExperienceSection />
      <SignatureDrinks />
      <ChefSection />
      <SocialProof />
      <ReservationCTA />
    </IntroLoader>
  );
}
