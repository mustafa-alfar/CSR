import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import aboutBanner from "../../../assets/images/about-us.jpg";

const AboutUs = () => {

  useEffect(() => {
    document.body.classList.add('account-page');

    return () => {
      document.body.classList.remove('account-page');
    }
  }, [])


  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">About Us</li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">About Us</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">

          <div className="row">
            <div className="col-md-10 offset-md-1">

              <div className="account-content">
                <div className="row align-items-center justify-content-center">

                  <div className="col-md-7 col-lg-6 login-left text-center">
                    <img src={aboutBanner} className="img-fluid" alt="About Us" />
                  </div>

                  <div className="col-md-12 col-lg-6 login-right border-0">
                    <div className="login-header">
                      <h3 className="text-info">Welcome!</h3>
                    </div>
                      <p className="text-muted text-justify">C.R.S was founded to recruit qualified nursing staff abroad and to integrate them into the German labor market. Our objective is to counter the large shortage of skilled nursing staff in Germany and at the same time open up new career prospects for foreign nursing staff.</p>
                      <p className="text-muted text-justify mb-0">Our nursing staff is very well trained and optimally prepared for their work in Germany. Employers are informed extensively about our services. We guarantee a high service quality and transparent processes. With us, employers and nursing staff get everything from a single source. This means that we organize and carry out everything from the first interview with the nurse and the employer up to the beginning of the employment relationship – including language training, the recognition of qualifications, different aspects of residence law, entry into Germany, the search for accommodation, support, qualification and placement.</p>
                  </div>
                    
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AboutUs;