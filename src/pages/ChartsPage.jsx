import { Charts } from "../components/Charts";
import { ClientesHoy } from "../components/ClientesTotal";
import { PedidosHoy } from "../components/PedidosHoy";
import { ProductosHoy } from "../components/ProductosHoy";
import { VentasHoy } from "../components/VentasHoy";


export function ChartsPage(){
    return(
        <div className="w-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="col-span-1 lg:col-span-2">
                <Charts />
            </div>

            <VentasHoy />
            <PedidosHoy />
            <ProductosHoy />
            <ClientesHoy />

        </div>

    )
}