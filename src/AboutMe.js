import React, { Component } from 'react'


export default class AboutMe extends Component {
    render() {
        return (
            <div>
                <p className={'about'} >About the Developers who brought you this app:</p> 
                <section className={'about-me-section'} >
                    <div className={'about-me-div'} >
                        

                            <div className={'about-me-card'} >
                                    <h2>Jake Pendergraft</h2>
                                    <img src="jake.jpg" alt="developer" /> 
                                    <p>Jake enjoys video games, spending time outdoors, 
                                    playing sports, software development, and reading
                                    large fantasy novels. When not engineering software,
                                    he can often be found out in the woods playing disc 
                                    golf, or walking his black lab Leo.
                                    </p>
                            </div>

                            <div className={'about-me-card'}>
                                <h2>Joey Leaptrott</h2>
                                <img src="joey.jpg" alt="developer"/>
                                <p>Joey enjoys gaming, sports, fitness, and getting to 
                                    experiment with new recipes in the kitchen. While not 
                                    enjoying a run in the rain or playing games, he is sharpening 
                                    his coding skills to improve himself as a developer. 
                                    His favorite sports teams are: the Portland Trailblazers, 
                                    the Seattle Seahawks, and the Washington Huskies..</p>
                            </div>
                            
                            <div className={'about-me-card'}>
                                <h2>Dan Bennington</h2>
                                <img src="dan.jpg" alt="developer"/>
                                <p>Dan enjoys motorcycles, going on hikes, watching and playing 
                                    basketball (go Blazers and Lakers!), lifting heavy objects
                                    at the gym and developing software. When not working on new 
                                    code and enjoying the Portland area, Dan can be seen at the 
                                    beach or taking his motorcycle to the rest of Oregon.</p>
                            </div>
                        </div>
                </section>
            </div>
        )
    }
}
