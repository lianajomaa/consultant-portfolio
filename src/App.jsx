import { Routes, Route, Outlet } from 'react-router-dom'

/* ---------- existing portfolio site ---------- */
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Publications from './pages/Publications'
import Training from './pages/Training'
import Certifications from './pages/Certifications'
import Blog from './pages/Blog'
import Events from './pages/Events'
import Contact from './pages/Contact'

/* ---------- learning platform ---------- */
import AcademyLayout from './components/academy/AcademyLayout'
import AcademyHome from './pages/academy/AcademyHome'
import PathPage from './pages/academy/PathPage'
import CoursesIndex from './pages/academy/CoursesIndex'
import CourseLanding from './pages/academy/CourseLanding'
import LessonPage from './pages/academy/LessonPage'
import QuizPage from './pages/academy/QuizPage'
import ExercisePage from './pages/academy/ExercisePage'
import AssessmentPage from './pages/academy/AssessmentPage'
import Dashboard from './pages/academy/Dashboard'
import CertificatePage from './pages/academy/CertificatePage'
import Checkout from './pages/academy/Checkout'

/**
 * Two layouts, because the two halves of the site have different chrome.
 *
 * The portfolio keeps its original Navbar and Footer. The academy has its own
 * header (different navigation, Log In and Get Started) and its own footer.
 *
 * Note this MUST be a layout route rather than <Navbar /> rendered once above
 * <Routes> — otherwise every academy page renders the portfolio's navbar and
 * footer as well as its own, giving two of each stacked on the page.
 */
function SiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      {/* ---------------- portfolio ---------------- */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/training" element={<Training />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ---------------- learning platform ---------------- */}
      <Route element={<AcademyLayout />}>
        <Route path="/learn" element={<AcademyHome />} />
        <Route path="/students" element={<PathPage audience="students" />} />
        <Route path="/professionals" element={<PathPage audience="professionals" />} />

        <Route path="/courses" element={<CoursesIndex />} />
        <Route path="/courses/:slug" element={<CourseLanding />} />
        <Route path="/courses/:slug/lessons/:lessonId" element={<LessonPage />} />
        <Route path="/courses/:slug/lessons/:lessonId/quiz" element={<QuizPage />} />
        <Route path="/courses/:slug/lessons/:lessonId/exercise" element={<ExercisePage />} />
        <Route path="/courses/:slug/assessment" element={<AssessmentPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/certificate/:slug" element={<CertificatePage />} />
        <Route path="/checkout/:planId" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App