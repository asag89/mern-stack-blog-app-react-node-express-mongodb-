
import "./banner.css"

const Banner = () => {
  return (
    <section className="banner-wrapper">
      <div className="banner">
        <div className="banner-msg">
          <h2 className="banner-title">What's on your mind?</h2>
          <div className="banner-text">Discover stories, thinking, and expertise from writers on any topic.</div>
          <button className="banner-button">Start writing</button>
        </div>
        <div className="svg-container">
        <svg className="svg" clipRule="evenodd" fillRule="evenodd" imageRendering="optimizeQuality" shapeRendering="geometricPrecision" textRendering="geometricPrecision" version="1.1" viewBox="0 0 5000 5000" xmlns="http://www.w3.org/2000/svg">
          <path className="fil0" d="m4024 3028c152 264 91 593-130 786-111 99-257 159-418 159-769-361-1183-360-1948 0-347 0-628-281-628-628-1-107 26-217 84-317 695-483 903-840 974-1687 117-202 328-315 546-314 217-1 429 112 546 314 71 847 279 1204 974 1687z" />
          <path className="fil1" d="m3909 3344c0-238-193-431-431-431s-431 193-431 431 193 431 431 431 431-193 431-431z" />
          <path className="fil1" d="m2935 1656c0-238-193-431-431-431s-431 193-431 431 193 431 431 431 431-193 431-431z" />
          <path className="fil1" d="m2935 2781c0-238-193-431-431-431s-431 193-431 431 193 431 431 431 431-193 431-431z" />
          <path className="fil1" d="m1961 3344c0-238-193-431-431-431s-431 193-431 431 193 431 431 431 431-193 431-431z" />
        </svg>
        </div>
      </div>
    </section>
  )
}
export default Banner