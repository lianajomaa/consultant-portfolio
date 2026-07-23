
import b1 from '../assets/blog/Blog1.webp'
import b2 from '../assets/blog/Blog2.webp'
import b3 from '../assets/blog/Blog3.webp'
import b4 from '../assets/blog/blog5.webp'
import b5 from '../assets/blog/Blog6.webp'
import b6 from '../assets/blog/Blog7.webp'
import b7 from '../assets/blog/Blog8.webp'
import b8 from '../assets/blog/Blog9.webp'
import g1 from '../assets/blog/gptw1.webp'
import g2 from '../assets/blog/gptw2.webp'
import g3 from '../assets/blog/gptw3.webp'
import g4 from '../assets/blog/gptw4.webp'
import g5 from '../assets/blog/gptw5.webp'
import g6 from '../assets/blog/gptw6.webp'
import g7 from '../assets/blog/gptw7.webp'
import g8 from '../assets/blog/gptw8.webp'
import g9 from '../assets/blog/gptw9.webp'

function Blog() {
  const anahar = [
    { title: "Hopelessness: A Predicament Threatening the Future of Lebanese Youth", author: "Jana Saab & Fatima AlHusseiny", link: "https://www.annahar.com/arabic/section/237-%D8%AD%D8%B1%D8%B1-%D9%81%D9%83%D8%B1%D9%83/18072022055835472", image: b1 },
    { title: "The Impact of the Mega Crisis on Lebanese Businesses: A Drastic Change!", author: "Jana Saab", link: "https://www.annahar.com/arabic/section/237-%D8%AD%D8%B1%D8%B1-%D9%81%D9%83%D8%B1%D9%83/25072022054836872", image: b2 },
    { title: "Youth in the MENA Region: Struggling in Fire!", author: "Jana Saab", link: "https://www.annahar.com/arabic/section/237-%D8%AD%D8%B1%D8%B1-%D9%81%D9%83%D8%B1%D9%83/08082022061604433", image: b3 },
    { title: "How Does LinkedIn Help High School Students Reach Out to Colleges and Careers", author: "Jana Saab", link: "https://www.annahar.com/arabic/section/237-%D8%AD%D8%B1%D8%B1-%D9%81%D9%83%D8%B1%D9%83/24102022074417761", image: b4 },
    { title: "Will ChatGPT Replace Copywriters?", author: "Jana Saab", link: "https://www.annahar.com/arabic/section/237-%D8%AD%D8%B1%D8%B1-%D9%81%D9%83%D8%B1%D9%83/16012023080248663", image: b5 },
    { title: "Mastering Language Learning Through Engineering: Non-stoppable Progress", author: "Jana Saab", link: "https://www.annahar.com/arabic/section/237-%D8%AD%D8%B1%D8%B1-%D9%81%D9%83%D8%B1%D9%83/262819/mastering-language-learning-through-engineering-non-stoppable-progress", image: b6 },
    { title: "Artificial Intelligence: Hacking Human Emotions", author: "Jana Saab & Ali Abu Melhem", link: "https://www.annahar.com/arabic/section/237-%D8%AD%D8%B1%D8%B1-%D9%81%D9%83%D8%B1%D9%83/307047/artificial-intelligence-hacking-human-emotions", image: b7 },
    { title: "Empowering Women in AI: 3 Best Practices to Promote Their Inclusivity", author: "Jana Saab", link: "https://www.annahar.com/arabic/section/237-%D8%AD%D8%B1%D8%B1-%D9%81%D9%83%D8%B1%D9%83/308832/empowering-women-in-ai-3-best-practices-to-promote-their-inclusivity", image: b8 },
  ]

  const others = [
    { title: "How Can Training Employees on Using AI Tools Foster Collaboration Within Qatari Organizations?", author: "Jana Saab", link: "https://greatplacetowork.me/how-can-training-employees-on-using-ai-tools-foster-collaboration-within-qatari-organizations/", image: g1 },
    { title: "4 Strategies to Promote Resilience in UAE Workplaces", author: "Jana Saab", link: "https://greatplacetowork.me/4-strategies-to-promote-resilience-in-uae-workplaces/", image: g2 },
    { title: "Kuwait 2035 Vision: Creating a Promising Future", author: "Jana Saab", link: "https://greatplacetowork.me/kuwait-2035-vision-creating-a-promising-future/", image: g3 },
    { title: "أفضل الطرق لتشجيع الابتكار في بيئة العمل في السعودية", author: "Jana Saab", link: "https://greatplacetowork.me/%d8%a3%d9%81%d8%b6%d9%84-%d8%a7%d9%84%d8%b7%d8%b1%d9%82-%d9%84%d8%aa%d8%b4%d8%ac%d9%8a%d8%b9-%d8%a7%d9%84%d8%a7%d8%a8%d8%aa%d9%83%d8%a7%d8%b1-%d9%81%d9%8a-%d8%a8%d9%8a%d8%a6%d8%a9-%d8%a7%d9%84%d8%b9/", image: g4 },
    { title: "How to Boost Work-Life Balance in Kuwaiti Workplaces", author: "Jana Saab", link: "https://greatplacetowork.me/how-to-boost-work-life-balance-in-kuwaiti-workplaces/", image: g5 },
    { title: "4 Ways to Bridge Communication Gaps in Qatar Multilingual Workplaces", author: "Jana Saab", link: "https://greatplacetowork.me/4-ways-to-bridge-communication-gaps-in-qatar-multilingual-workplaces/", image: g6 },
    { title: "How UAE Best Workplaces™ Develop Employee Well-Being", author: "Jana Saab", link: "https://greatplacetowork.me/how-uae-best-workplaces-develop-employee-well-being/", image: g7 },
    { title: "How AI Is Driving Employee Development in KSA Workplaces", author: "Jana Saab", link: "https://greatplacetowork.me/how-ai-is-driving-employee-development-in-ksa-workplaces/", image: g8 },
    { title: "كيف يمكن تحسين التواصل بين الموظفين في مكان العمل؟", author: "Jana Saab", link: "https://greatplacetowork.me/%d9%83%d9%8a%d9%81-%d9%8a%d9%85%d9%83%d9%86-%d8%aa%d8%ad%d8%b3%d9%8a%d9%86-%d8%a7%d9%84%d8%aa%d9%88%d8%a7%d8%b5%d9%84-%d8%a8%d9%8a%d9%86-%d8%a7%d9%84%d9%85%d9%88%d8%b8%d9%81%d9%8a%d9%86-%d9%81/", image: g9 },
  ]

  const CardGrid = ({ items }) => (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((post, i) => (
        <a key={i} href={post.link} target="_blank" rel="noopener noreferrer"
          className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md">
          <div className="h-44 overflow-hidden bg-[#EAF3FF]">
            <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 flex-col p-5" dir="auto">
            <h3 className="text-sm font-semibold leading-snug text-navy group-hover:underline md:text-base">{post.title}</h3>
            <p className="mt-2 text-[11px] text-navy md:text-xs">{post.author}</p>
            <span className="mt-auto pt-3 text-[11px] font-medium text-navy md:text-xs">Read article →</span>
          </div>
        </a>
      ))}
    </div>
  )

  return (
    <div>
      <section className="bg-navy px-8 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[7px] w-[7px] bg-baby" />
            <span className="text-xs tracking-[0.2em] text-baby">BLOG &amp; INSIGHTS</span>
          </div>
          <h1 className="font-serif text-3xl font-medium text-white md:text-4xl">Content that Matters!</h1>
          <p className="mt-5 max-w-2xl text-sm leading-loose text-white md:text-base">
            Exploring communication, AI, NLP, personal branding, workplace trends, and professional growth.
          </p>
        </div>
      </section>

      {/* Great Place To Work Middle East — on top */}
      <section className="bg-white px-8 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-[7px] w-[7px] border border-navy bg-baby" />
            <span className="text-xs tracking-[0.2em] text-navy">PUBLISHED IN GREAT PLACE TO WORK MIDDLE EAST</span>
          </div>
          <CardGrid items={others} />
        </div>
      </section>

      {/* Annahar News — below */}
      <section className="border-t border-slate-100 bg-[#F5F9FD] px-8 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-[7px] w-[7px] border border-navy bg-baby" />
            <span className="text-xs tracking-[0.2em] text-navy">ANNAHAR NEWS</span>
          </div>
          <CardGrid items={anahar} />
        </div>
      </section>
    </div>
  )
}

export default Blog