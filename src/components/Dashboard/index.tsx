import { Summary } from "../Summary";
import { TransactionTable } from "../transactionsTable";
import { Container } from "./styles";

export function Dashboard() {
    return (
        <Container>
           <Summary />
           <TransactionTable />
        </Container>
    );
}