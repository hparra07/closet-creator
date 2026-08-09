// Real client reviews pulled from jlclosets.com (homepage + the dedicated
// reviews page), spanning Google, Houzz, Angi, Best Pick Reports, and
// Facebook. Used to show a different, randomized set of reviews on each
// page's Success Stories section instead of the same fixed few everywhere.
export type Review = { quote: string; a: string; loc: string; source: string; url: string };

export const REVIEWS_POOL: Review[] = [
  { quote: "JL Closets were awesome. If you are looking for a great company look no further. Thank you so much, we love our closets!!", a: "Lourdes Loreti", loc: "Boynton Beach, FL", source: "Google", url: "https://maps.app.goo.gl/j1RS7X7B8PDehUUv7" },
  { quote: "Most competitive pricing and excellent and timely work! 10/10 would recommend for custom closets and shelving!", a: "Sarah Jackson", loc: "FL", source: "Google", url: "https://maps.app.goo.gl/ZWA33euhuzaZc39MA" },
  { quote: "First class company with great design and workmanship. Andrea and Sophia are an awesome team.", a: "Tod Edward Highfield", loc: "Boca Raton, FL", source: "Google", url: "https://maps.app.goo.gl/ZWA33euhuzaZc39MA" },
  { quote: "JL Closets delivered on time with no surprises or problems. Highly recommended.", a: "Danny McMullen", loc: "Boca Raton, FL", source: "Google", url: "https://maps.app.goo.gl/TdVTxBy3eEvWX4qc8" },
  { quote: "Very professional, excellent service and product. They completed the job as promised in a timely manner. Thanks!", a: "Marlene Hunter", loc: "Lake Worth, FL", source: "Google", url: "https://maps.app.goo.gl/dC7aENQgFCe7d1D58" },
  { quote: "JL closets staff are EXTREMELY professional, helpful, flexible and most of all, SUPER friendly! Not to mention that the closets look AMAZING! I will recommend them to anyone who needs to update or custom design their closets.", a: "Luis Emmanuelli", loc: "West Palm Beach, FL", source: "Google", url: "https://maps.app.goo.gl/6viRFPEKwmZ2zspc8" },
  { quote: "The JL Closets team were incredible. The designer took the time to discuss every space with us. The installers came in and completed our closet in one day.", a: "John Daniels", loc: "South Florida", source: "Google", url: "https://maps.app.goo.gl/JMU1Gg6UieT8my4g6" },
  { quote: "Their expertise is unmatched. They transformed our space beautifully.", a: "David L.", loc: "South Florida", source: "Google", url: "https://maps.app.goo.gl/31JdMxZKjUzWP2kr6" },
  { quote: "As a design-build contractor, I have been working with JL Closets for 18 years. It's all about the service.", a: "Julie K.", loc: "South Florida", source: "Google", url: "https://maps.app.goo.gl/FKTzHK8afuCZCGBu9" },
  { quote: "Stephen and Rob came to do my closet and worked super quickly and made my dream closet come true.", a: "Delia D.", loc: "South Florida", source: "Google", url: "https://maps.app.goo.gl/bEV6yBrk2HL4Zb8o6" },
  { quote: "Very professional, patient, creative and had everything ready quickly. Thank you JL Closets!!", a: "Marie S.", loc: "South Florida", source: "Google", url: "https://maps.app.goo.gl/jdBxgDQN8S3WDzkF7" },
  { quote: "JL Closets did a fantastic job on my closets. Measurements were taken flawlessly and installations were fabulous.", a: "Dustin F.", loc: "South Florida", source: "Facebook", url: "https://www.facebook.com/share/p/1ACi9E6h7N/" },
  { quote: "The quality of work is outstanding. Our new closets are both beautiful and functional.", a: "Linda K.", loc: "South Florida", source: "Houzz", url: "https://www.houzz.com/viewReview/1147136/JL-Closets-review" },
  { quote: "This is the third time that we have had the pleasure of using JL Closets. They always come up with the best solutions to maximize the space in our closets.", a: "Yvonne G.", loc: "South Florida", source: "Houzz", url: "https://www.houzz.com/viewReview/1324274/JL-Closets-review" },
  { quote: "The team was professional and prompt, and I feel as though they have good leadership.", a: "Ronald H.", loc: "South Florida", source: "Angi", url: "https://www.angi.com/companylist/us/fl/boca-raton/jl-closets-reviews-9613643.htm" },
  { quote: "The installers came in and completed our closet in one day. Very efficient.", a: "Gray V.", loc: "South Florida", source: "Angi", url: "https://www.angi.com/companylist/us/fl/boca-raton/jl-closets-reviews-9613643.htm" },
  { quote: "The quality is great and it's beautiful. Working with their designer was delightful and she designed the perfect spaces for us. Pricing was very reasonable.", a: "Sofia G.", loc: "South Florida", source: "Angi", url: "https://www.angi.com/companylist/us/fl/boca-raton/jl-closets-reviews-9613643.htm" },
  { quote: "I cannot say enough great things about this company. The installers were prompt, professional and did an excellent job. They even cleaned up after themselves which is HUGE!", a: "Eleanore M.", loc: "South Florida", source: "Angi", url: "https://www.angi.com/companylist/us/fl/boca-raton/jl-closets-reviews-9613643.htm" },
  { quote: "We have used JL Closets twice now and they will continue to be our first choice for built ins. They designed and installed our garage last year, and this year our master closet and kids' bedroom closets — all with a unique design.", a: "Sara V.", loc: "South Florida", source: "Angi", url: "https://www.angi.com/companylist/us/fl/boca-raton/jl-closets-reviews-9613643.htm" },
  { quote: "Professional and knowledgeable team. They made the entire process smooth and stress-free.", a: "Sarah M.", loc: "South Florida", source: "Best Pick Reports", url: "https://www.bestpickreports.com/closet-kitchen-and-garage-organizers/south-florida/jl-closets" },
  { quote: "Expert advice and flawless execution. Highly recommend JL Closets.", a: "Michael P.", loc: "South Florida", source: "Best Pick Reports", url: "https://www.bestpickreports.com/closet-kitchen-and-garage-organizers/south-florida/jl-closets" },
  { quote: "From start to finish, the team was professional and attentive to our needs.", a: "Emily R.", loc: "South Florida", source: "Best Pick Reports", url: "https://www.bestpickreports.com/closet-kitchen-and-garage-organizers/south-florida/jl-closets" },
  { quote: "Top-notch quality and attention to detail. Worth every penny.", a: "Robert S.", loc: "South Florida", source: "Best Pick Reports", url: "https://www.bestpickreports.com/closet-kitchen-and-garage-organizers/south-florida/jl-closets" },
];

/** Picks `count` random, non-repeating reviews from the pool. */
export function getRandomReviews(count: number): Review[] {
  const shuffled = [...REVIEWS_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
