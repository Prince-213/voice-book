import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const books = [
  {
    id: "1",
    title: "The Art of Self-Care",
    author: "Jane Mitchell",
    datePublished: "2022-05-12",
    category: "Health",
    image: "pngwing.com (45).png",
    introduction:
      "Discover the essential practices for nurturing your body, mind, and soul in a fast-paced world.",
    firstChapter: "Introduction to Self-Care: Why It Matters More Than Ever",
    firstChapterBrief:
      "This chapter explores the concept of self-care, its importance, and the foundational steps to integrate it into your daily routine."
  },
  {
    id: "2",
    title: "Eat Well, Live Well",
    author: "Dr. Emily Carter",
    datePublished: "2021-08-20",
    category: "Health",
    image: "pngwing.com (46).png",
    introduction:
      "Learn how nutrition impacts your health and the steps to transform your eating habits.",
    firstChapter:
      "The Foundation of a Healthy Diet: Understanding Food Choices",
    firstChapterBrief:
      "Dive into the basics of nutrition and how making informed food choices can set the stage for a healthier lifestyle."
  },
  {
    id: "3",
    title: "Minimalist Living",
    author: "Samuel Brooks",
    datePublished: "2020-03-15",
    category: "Lifestyle",
    image: "pngwing.com (47).png",
    introduction: "Simplify your life and find peace in living with less.",
    firstChapter: "Decluttering Your Mind and Space: The Minimalist Approach",
    firstChapterBrief:
      "This chapter outlines the benefits of minimalism and provides actionable tips for decluttering your home and mind."
  },
  {
    id: "4",
    title: "The Modern Homemaker",
    author: "Laura Peters",
    datePublished: "2019-11-10",
    category: "Lifestyle",
    image: "pngwing.com (48).png",
    introduction:
      "Master the art of homemaking in the 21st century with tips, tricks, and insights.",
    firstChapter: "Creating a Home That Works for You and Your Family",
    firstChapterBrief:
      "Learn the principles of creating a functional and welcoming home environment tailored to your unique needs."
  },
  {
    id: "5",
    title: "Unstoppable: Your Journey to Success",
    author: "Michael Thompson",
    datePublished: "2023-07-01",
    category: "Motivation",
    image: "pngwing.com (49).png",
    introduction:
      "Unlock your potential and embark on a journey toward achieving your dreams.",
    firstChapter: "Defining Success: Setting Goals That Matter",
    firstChapterBrief:
      "Explore what success means to you and learn how to set clear, actionable goals to achieve your vision."
  },
  {
    id: "6",
    title: "Awaken the Giant Within",
    author: "Tony Robbins",
    datePublished: "1991-11-01",
    category: "Motivation",
    image: "pngwing.com (50).png",
    introduction:
      "Take control of your destiny and unleash the power within to create lasting change.",
    firstChapter: "The Power of Decision: Taking the First Step",
    firstChapterBrief:
      "This chapter emphasizes the significance of making firm decisions and taking the first step towards meaningful change."
  }
];
