import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Header from "components/Header";
import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import Button from "components/ui/Button";
import UploadFile from "components/UploadFile";
import { useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  const handleUploadComplete = (base64Image: string) => {
    const newId = Date.now().toString();
    navigate(`/visualizer/${newId}`, { state: { image: base64Image } })

    return true;
  }




  return (

    <div className="home">
      <Header />

      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>Introducing Roomify 2.0 </p>
        </div>
        <h1>Build beautiful spaces at the speed of thought with Roomify.</h1>
        <p className="subtitle">Experience the future of design with Roomify's AI-powered platform. Create stunning spaces in seconds, not hours.</p>
        <div className="actions">
          <a href="#upload" className="cta">
            Get Started
            <ArrowRight className="icon" />
          </a>
          <Button variant="secondary" size='lg' className="demo" >Watch Demo </Button>
        </div>

        <div className="upload-shell" id="upload">
          <div className="grid-overlay" />

          <div className="upload-card mx-auto mt-12">
            <div className="upload-head ">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>
              <h3>Upload your floor plan</h3>
              <p>Supports JPG, PNG, formats upto 10MB</p>
            </div>
            <UploadFile onComplete={handleUploadComplete} />

          </div>

        </div>
      </section>

      <section className="projects">
        <div className="section-inner">

          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>Your Latest Project and shared Community Project, all in one place</p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png" alt="project" />
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h3>Project Manhattan</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span>{new Date('01.01.2027').toLocaleDateString()}</span>
                    <span>Saif Dev</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={18} />

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>




    </div>
  )
}
