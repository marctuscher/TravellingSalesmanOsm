
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as coreActions from '../services/core/actions'
import '../../css/components/notifications.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { toHtml } from '@fortawesome/fontawesome-svg-core';

class Notifications extends React.Component{

	constructor(props){
		super(props)
	}

	deleteNotification(keyToDelete){
		switch(this.props.notifications[keyToDelete].title){
			case "Optimal":
				this.props.coreActions.clearTsp();
			break;
			case "Dijkstra":
				this.props.coreActions.clearRouting();
			break;
			case "2-APX":
				this.props.coreActions.clearApx();
			break;
			default:
		}
		this.props.coreActions.removeNotification(keyToDelete);
	}

	renderNotifications(){
		if (!this.props.notifications || this.props.notifications.length <= 0) return null

		var notifications = []
		for (var key in this.props.notifications){
			if (this.props.notifications.hasOwnProperty(key)){
				notifications.push(this.props.notifications[key])
			}
		}

		return (
			<span>
				{
					notifications.map(notification => {
						if (notification.appState && notification.appState !== this.props.appState){
							return null;
						}
								return (
									<div className={notification.type+" notification"+(notification.closing ? ' closing' : '')} key={notification.key} data-key={notification.key} data-duration={notification.duration}>
										{notification.title ? <div className="title"><h4>{notification.title}</h4><div className="close-button" onClick={()=>this.deleteNotification(notification.key)}><FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon></div></div> : null}
										
										<p className="content" dangerouslySetInnerHTML={{__html: notification.content}}></p>
										{notification.description ? <p className="description" dangerouslySetInnerHTML={{__html: notification.description}}></p> : null }
									</div>
								)
					})
				}
			</span>
		)
	}

	renderProcess(process){

		var progress = 0;
		if (process.data.total && process.data.remaining){
			progress = ((process.data.total - process.data.remaining) / process.data.total * 100).toFixed()
		}

		switch (process.status){
			case 'running':
				return(
					<div className={"process notification"+(process.closing ? ' closing' : '')} key={process.key}>
						<div className="loader">
							<div className="progress">
								<div className="fill" style={{width: progress+'%'}}></div>
							</div>
						</div>
						{process.message}
					</div>
				)

			case 'cancelling':
				return(
					<div className={"process notification cancelling"+(process.closing ? ' closing' : '')} key={process.key}>
						<div className="loader"></div>
						Cancelling
					</div>
				)

			case 'cancelled':
			case 'finished':
				return null
		}
	}

	renderProcesses(){
		if (!this.props.processes || this.props.processes.length <= 0) return null

		var processes = []
		for (var key in this.props.processes){
			if (this.props.processes.hasOwnProperty(key)){
				processes.push(this.props.processes[key])
			}
		}

		return (
			<span>
				{processes.map(process => {
					return this.renderProcess(process)
				})}
			</span>
		)
	}

	// do we want the loading of everything to be displayed?
	// not likely...
	renderLoader(){
		if (!this.props.load_queue){
			return null
		}

		var load_queue = this.props.load_queue
		var load_count = 0
		for (var key in load_queue){
			if (load_queue.hasOwnProperty(key)){
				load_count++
			}
		}

		if (load_count > 0){
			var className = "loading "
			if (load_count > 20){
				className += 'high'
			} else if (load_count > 5){
				className += 'medium'
			} else {
				className += 'low'
			}
			return (
				<div className={className}></div>
			)
		} else {
			return null
		}
	}

	render(){
		return (
			<div className="notifications">
				{/*this.renderLoader()*/}
				{this.renderNotifications()}
				{/*this.renderProcesses()*/}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		notifications: (state.core.notifications ? state.core.notifications : []),
		appState : state.core.appState
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		coreActions: bindActionCreators(coreActions, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)