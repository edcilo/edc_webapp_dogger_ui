export default function Modal(props) {
    return (
        <div className="main-modal fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster bg-black bg-opacity-40">
            <div className="border shadow-lg modal-container bg-white w-4/12 md:max-w-11/12 mx-auto rounded shadow-lg z-50 overflow-y-auto p-5">
                <div className="flex justify-between items-center pb-3">
					<p className="text-2xl font-bold">{props.title}</p>
					<button className="modal-close cursor-pointer z-50" onClick={props.closeHandler}>
						<svg className="fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
							viewBox="0 0 18 18">
							<path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
							</path>
						</svg>
					</button>
				</div>

                {props.children}
            </div>
        </div>
    )
}
