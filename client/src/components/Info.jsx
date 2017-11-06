import React from 'react';

//async component using fetch to be rendered
class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
    }

    async componentDidMount() {
        try {
            const res = await fetch(this.props.infoUrl);
            const data = await res.json();
            this.setState({message: data.message});
        }
        catch(e) {
            console.error('Error occured ' + e);
        }
    }
    
    render() {
        return <div className="list__info">{this.state.message}</div>;
    }

}

export default Info;
