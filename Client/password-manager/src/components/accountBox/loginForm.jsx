import React, {useContext} from "react";
import { AccountContext } from "./accountContext";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "./marginer";

export function LoginForm(props) {

    const {switchToRegister} = useContext(AccountContext);

    return <BoxContainer>
        <FormContainer>
            <Marginer direction="vertical" margin={10} />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
        </FormContainer>
        <Marginer direction="vertical" margin={15} />
            <MutedLink href="#">Forgot password?</MutedLink>
            <Marginer direction="vertical" margin="2em" />
            <SubmitButton type="submit">Login</SubmitButton>
            <Marginer direction="vertical" margin="2em" />
            <MutedLink href="#">Don't have an account? <BoldLink href="#" onClick={switchToRegister}>Register</BoldLink></MutedLink>
    </BoxContainer>
}