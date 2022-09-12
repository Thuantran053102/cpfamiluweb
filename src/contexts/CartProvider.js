import React, { Component } from 'react';
import { CartContext } from './CartContext';

class CartProvider extends Component {
    state = {
        user: null,
        classPrice: "G"
    }

    componentDidMount() {
        // await AsyncStorage.clear();
        let userStorage = localStorage.getItem("user");
        let classPriceStorage = localStorage.getItem("classPrice");

        if (userStorage !== null) {
            let user = JSON.parse(userStorage);
            this.setState({ user })
        }

        if (classPriceStorage !== null) {
            // let classPrice = JSON.parse(classPriceStorage);
            this.setState({ classPrice: classPriceStorage })
            localStorage.setItem('classPrice', classPriceStorage);
        } else {
            this.setState({ classPrice: "G" })
            localStorage.setItem('classPrice', 'G');
        }


    }


    handleLogin = (user) => {
        this.setState({ user })
        localStorage.setItem("user", JSON.stringify(user))
    }

    handleLogout = () => {
        this.setState({ user: null });
        this.clearCart();
        localStorage.multiRemove(['cart', 'user']);

    }

    resetClassPrice = () => {
        this.setState({ classPrice: "G" })
        localStorage.setItem('classPrice', 'G');
    }

    handleClassPrice = (classPrice) => {
        this.setState({ classPrice })
        localStorage.setItem('classPrice', classPrice);
    }


    render() {
        return (
            <CartContext.Provider value={{
                user: this.state.user,
                classPrice: this.state.classPrice,
                //user
                handleLogin: this.handleLogin,
                handleLogout: this.handleLogout,
                handleClassPrice: this.handleClassPrice,
                resetClassPrice: this.resetClassPrice
            }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

export default CartProvider;
