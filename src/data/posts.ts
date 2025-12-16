export interface Post {
  id: string;
  userId: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string;
}

export const posts: Post[] = [
  // Marcus Sterling's posts
  {
    id: "p1",
    userId: "1",
    title: "The Future of Clean Energy",
    excerpt: "We're on the verge of a massive breakthrough in solar efficiency. Here's what it means for humanity...",
    content: "We're on the verge of a massive breakthrough in solar efficiency. Our team has achieved 47% conversion rates in lab conditions, far exceeding the current commercial standard of 22%. This isn't just an incremental improvement—it's a paradigm shift.\n\nWhat does this mean? Within five years, solar energy could become cheaper than coal in every market worldwide. We're talking about a complete transformation of the global energy landscape.\n\nThe implications extend beyond just electricity. Cheap, abundant clean energy enables everything from desalination plants that can provide fresh water to billions, to electric aircraft that could revolutionize travel.\n\nThe future is brighter than ever. We just need to keep pushing.",
    createdAt: "2024-01-15",
  },
  {
    id: "p2",
    userId: "1",
    title: "Why I Invest in Space",
    excerpt: "People ask me why a clean energy company invests in space exploration. The answer is simple...",
    content: "People ask me why a clean energy company invests in space exploration. The answer is simple: the technologies required for space are the same ones that will save Earth.\n\nLife support systems, closed-loop recycling, efficient power generation, advanced materials—every breakthrough we make for space directly translates to terrestrial applications.\n\nOur Mars habitat research has already produced three patents for water recycling that are now being deployed in drought-affected regions.\n\nSpace isn't an escape from Earth's problems. It's a laboratory for solving them.",
    createdAt: "2024-01-10",
  },
  {
    id: "p3",
    userId: "1",
    title: "On Building Teams",
    excerpt: "The most important skill in building a company isn't technical—it's finding people who share your vision...",
    content: "The most important skill in building a company isn't technical—it's finding people who share your vision and complement your weaknesses.\n\nI've made every hiring mistake in the book. I've hired brilliant jerks, nice incompetents, and people who just wanted the prestige without the work.\n\nWhat I've learned: hire for character first, skills second. You can teach someone new technologies. You can't teach integrity or work ethic.\n\nThe best teams I've built weren't the smartest on paper. They were the ones who genuinely cared about what we were trying to accomplish.",
    createdAt: "2024-01-05",
  },

  // Elena Voss's posts
  {
    id: "p4",
    userId: "2",
    title: "The Art of Deep Reading",
    excerpt: "In an age of infinite scroll, the ability to deeply engage with a text is becoming rare and valuable...",
    content: "In an age of infinite scroll, the ability to deeply engage with a text is becoming rare and valuable. We consume more words than any generation in history, yet understand less.\n\nDeep reading isn't just about comprehension—it's about allowing ideas to reshape your mental landscape. It requires silence, patience, and the willingness to be uncomfortable.\n\nI challenge you this week: take one book, turn off your phone, and read for two hours uninterrupted. Notice how your mind resists at first, then settles.\n\nThat settling is where real understanding begins.",
    createdAt: "2024-01-14",
  },
  {
    id: "p5",
    userId: "2",
    title: "Why Stories Matter",
    excerpt: "We are not the rational creatures we believe ourselves to be. We are narrative creatures...",
    content: "We are not the rational creatures we believe ourselves to be. We are narrative creatures, and the stories we tell ourselves shape everything—our identities, our politics, our relationships.\n\nEvery culture, every religion, every nation is held together by shared narratives. Change the story, and you change reality.\n\nThis is why fiction matters. Not as escapism, but as rehearsal for empathy. Every novel you read is practice at understanding minds different from your own.\n\nIn a fractured world, stories might be our best hope for rebuilding connection.",
    createdAt: "2024-01-08",
  },
  {
    id: "p6",
    userId: "2",
    title: "On Creative Doubt",
    excerpt: "Every artist I admire suffers from the same affliction: the certainty that they're frauds...",
    content: "Every artist I admire suffers from the same affliction: the certainty that they're frauds about to be discovered.\n\nI've written seven novels, won prizes, sold millions of copies. I still begin every new book convinced I've forgotten how to write.\n\nBut here's what I've learned: the doubt isn't a bug, it's a feature. The moment you're certain of your genius is the moment you stop improving.\n\nDon't fight the fear. Let it keep you humble, keep you working, keep you reaching for something just beyond your grasp.",
    createdAt: "2024-01-02",
  },
  {
    id: "p7",
    userId: "2",
    title: "The Silence Between Words",
    excerpt: "The best conversations aren't about what's said—they're about what's understood without saying...",
    content: "The best conversations aren't about what's said—they're about what's understood without saying.\n\nIn Japanese, there's a concept called 'ma'—the meaningful pause, the pregnant silence. It's not empty space but charged space, full of potential.\n\nWe've lost this in our rush to fill every moment with content. We interrupt, we prepare our responses while others speak, we fear any gap in the noise.\n\nTry this: in your next conversation, wait three seconds before responding. Let the other person's words settle. You'll be amazed at what emerges in the silence.",
    createdAt: "2023-12-28",
  },

  // James Chen's posts
  {
    id: "p8",
    userId: "3",
    title: "What I Look for in Founders",
    excerpt: "After 20 years and 200 investments, I've learned that the best founders share one trait...",
    content: "After 20 years and 200 investments, I've learned that the best founders share one trait: they're comfortable with ambiguity.\n\nStartups are chaos machines. The business plan that gets funding bears almost no resemblance to what succeeds. Markets shift, technologies evolve, competitors emerge.\n\nThe founders who win aren't the ones with the best initial ideas. They're the ones who can navigate uncertainty without losing their minds or their conviction.\n\nI call it 'confident humility'—the ability to believe deeply in your vision while remaining open to evidence that you're wrong.",
    createdAt: "2024-01-13",
  },
  {
    id: "p9",
    userId: "3",
    title: "The 10x Engineer Myth",
    excerpt: "Silicon Valley loves the idea of the lone genius coder. It's also mostly wrong...",
    content: "Silicon Valley loves the idea of the lone genius coder—the 10x engineer who outproduces entire teams. It's also mostly wrong.\n\nYes, exceptional engineers exist. But their 'exceptional' impact usually comes from making everyone around them better, not from typing faster.\n\nThe engineers who've created the most value in my portfolio companies are the ones who write clear documentation, mentor juniors, and catch problems before they become crises.\n\nBrilliant jerks might ship features, but they destroy teams. And in the long run, great teams beat great individuals every time.",
    createdAt: "2024-01-07",
  },
  {
    id: "p10",
    userId: "3",
    title: "Why I'm Bullish on Boring",
    excerpt: "The flashiest startups get the headlines. The boring ones get the returns...",
    content: "The flashiest startups get the headlines. The boring ones get the returns.\n\nMy best investment wasn't a moonshot AI company or a crypto protocol. It was a B2B SaaS that helps accountants manage their workflows. No glamour, no TED talks, just steady 40% annual growth for a decade.\n\nBoring businesses work because they solve real problems for customers who are happy to pay. They don't need to change human behavior or create new markets.\n\nThe next time someone pitches you on revolutionizing an industry, ask if they've considered just making an existing industry 10% better. That's usually where the money is.",
    createdAt: "2024-01-01",
  },

  // Sofia Rodriguez's posts
  {
    id: "p11",
    userId: "4",
    title: "We Are Not Alone",
    excerpt: "After a decade of research, I'm increasingly confident that life exists beyond Earth...",
    content: "After a decade of research, I'm increasingly confident that life exists beyond Earth. Not because I've found it—but because the numbers simply don't allow for our uniqueness.\n\nThe observable universe contains roughly 200 billion galaxies, each with hundreds of billions of stars. Most of those stars have planets. We now know that the chemistry of life is not special—the building blocks are everywhere.\n\nThe question isn't whether life exists out there. It's why we haven't found it yet. That's what keeps me up at night.\n\nThe answer, I believe, will reshape everything we think about our place in the cosmos.",
    createdAt: "2024-01-12",
  },
  {
    id: "p12",
    userId: "4",
    title: "On Scientific Humility",
    excerpt: "The greatest scientists I know are the ones most comfortable saying 'I don't know'...",
    content: "The greatest scientists I know are the ones most comfortable saying 'I don't know.'\n\nScience isn't a collection of facts—it's a method for discovering how wrong we are. Every major breakthrough came from someone willing to question established truths.\n\nThis is hard in practice. Scientists are humans with egos and careers. Admitting uncertainty can feel like weakness.\n\nBut the willingness to be wrong is exactly what makes science work. The universe doesn't care about our reputations. It only rewards honest inquiry.",
    createdAt: "2024-01-06",
  },
  {
    id: "p13",
    userId: "4",
    title: "Why Space Matters Now",
    excerpt: "Some argue space exploration is a luxury we can't afford. I argue the opposite...",
    content: "Some argue space exploration is a luxury we can't afford while Earth faces so many problems. I argue the opposite: we can't afford not to explore.\n\nEvery dollar invested in space returns multiples in technological innovation, scientific understanding, and yes, economic value. GPS, weather satellites, and global communications—all space dividends.\n\nBut more importantly: space gives us perspective. When you see Earth from orbit—that thin blue line of atmosphere, no borders visible—it changes how you think about everything.\n\nWe need that perspective now more than ever.",
    createdAt: "2023-12-30",
  },

  // David Park's posts
  {
    id: "p14",
    userId: "5",
    title: "The AI Hype Cycle",
    excerpt: "We're simultaneously overestimating and underestimating artificial intelligence...",
    content: "We're simultaneously overestimating and underestimating artificial intelligence. The current hype cycle is pushing unrealistic expectations that will inevitably lead to disappointment.\n\nWhat AI can do today: narrow tasks with superhuman performance, pattern recognition at scale, language generation that mimics human output.\n\nWhat AI cannot do: understand meaning, generalize from limited examples, reason about novel situations the way humans do.\n\nThe gap between these two is where fortunes will be made and lost. The winners will be those who build practical applications, not those chasing artificial general intelligence.",
    createdAt: "2024-01-11",
  },
  {
    id: "p15",
    userId: "5",
    title: "Building Ethical AI",
    excerpt: "The question isn't whether AI will be biased. It's whether we'll acknowledge and address those biases...",
    content: "The question isn't whether AI will be biased. It's whether we'll acknowledge and address those biases.\n\nEvery AI system reflects the data it was trained on and the choices made by its creators. Those choices embed values, whether we intend them to or not.\n\nAt NeuralMind, we've made ethics review a core part of our development process. Not as PR, but as engineering discipline. We catch problems earlier, ship better products, and sleep better at night.\n\nThe companies that ignore this will face reckoning. The technology is too powerful for carelessness.",
    createdAt: "2024-01-04",
  },
  {
    id: "p16",
    userId: "5",
    title: "On Learning to Code",
    excerpt: "Everyone should learn to code, but not for the reasons you think...",
    content: "Everyone should learn to code, but not for the reasons you think.\n\nIt's not about job security or keeping up with technology. It's about understanding how the systems that shape our lives actually work.\n\nCode is the language of power in the 21st century. Those who understand it can question, critique, and shape the systems that govern us. Those who don't are at the mercy of those who do.\n\nYou don't need to become a professional developer. But understanding the basics of how software works is as essential today as basic literacy was a century ago.",
    createdAt: "2023-12-25",
  },
  {
    id: "p17",
    userId: "5",
    title: "The Future of Work",
    excerpt: "AI won't replace humans. But humans who use AI will replace humans who don't...",
    content: "AI won't replace humans. But humans who use AI will replace humans who don't.\n\nThis isn't a prediction—it's already happening. In our own company, we've seen productivity differences of 3-5x between teams that effectively leverage AI tools and those that resist them.\n\nThe good news: AI tools are getting easier to use. You don't need to understand machine learning to benefit from it. You just need to be willing to learn new workflows.\n\nThe people who thrive in the next decade will be those who view AI as a collaborator, not a competitor.",
    createdAt: "2023-12-20",
  },
];
