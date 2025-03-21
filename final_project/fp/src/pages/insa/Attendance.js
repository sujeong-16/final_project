import React from 'react'
import {
    Container, Header, Content, Footer, Sidebar,
    Calendar
} from 'rsuite';

/* 자동완성 단축키는 rfc 이다. */

export const Attendance = (props) => {
    return(
        <div className="show-container">
            <Container>
            <Sidebar>
                <>2025-03-20 (목)</>
            </Sidebar>
            <Container>
                <Header>Header</Header>
                <Content>
                    
                    <Calendar bordered style={{height: 600, width: 400}}/>
                </Content>
                <Footer>Footer</Footer>
            </Container>
            </Container>
        </div>
    );
}