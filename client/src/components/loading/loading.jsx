import './loading.css'

function Loading() {
  return (
  <div className="pl">
	<div className="pl__outer-ring"></div>
	<div className="pl__inner-ring"></div>
	<div className="pl__ball">
    <div className="pl__ball-texture"></div>
    <div className="pl__ball-inner-shadow"></div>
	</div>
  </div>
  )
}

export default Loading