import React, {useContext} from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "./marginer";
import { AccountContext } from "./accountContext";


export function RegisterForm(props) {

    const {switchToLogin} = useContext(AccountContext);

    return <BoxContainer>
        <FormContainer>
            <Marginer direction="vertical" margin={10} />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm Password" />
        </FormContainer>
        <Marginer direction="vertical" margin={15} />
        <SubmitButton type="submit">Signup</SubmitButton>
        <Marginer direction="vertical" margin="2em" />
        <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToLogin}>Login</BoldLink></MutedLink>
    </BoxContainer>
}