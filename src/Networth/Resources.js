import React,{Component} from 'react';


export default class Overtime extends Component{  

  render(){
    let resources=this.props.resources

  return (
    <>
      {(resources===true 
      ?(<ul className="list" id='debtList'><h2>Financial Planning Resources:</h2>
        <li>www.mint.com</li>
        <li>www.sofi.com</li>
      </ul>)
      : null
    )}
      {(resources===false 
      ?(<ul className="list" id='debtList'><h2>Financial Planning Resources:</h2>
              <li>www.vanguard.com</li>
              <li>www.blackrock.com</li>
            </ul>)
      : null
    )}

    </>
  )
}
}