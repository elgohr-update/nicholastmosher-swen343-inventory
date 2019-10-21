import React, { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "../reducers";
import {Box, Item, Pallet, Warehouse} from "../types/Interfaces";
import {fetchBoxes, fetchItems, fetchPallets, fetchWarehouses} from "../actions/ItemActions";
import { ThunkDispatch } from "redux-thunk";
import { Link, useLocation, useParams } from "react-router-dom";
import util from "./util";
import ButtonItem from "./AddButton";

interface StateProps {
  warehouses: Warehouse[],
  items: Item[];
  pallets: Pallet[],
  boxes: Box[],
}

interface DispatchProps {
  fetchWarehouses: () => void;
  fetchItems: () => void;
  fetchPallets: () => void;
  fetchBoxes: () => void;
}

type Props = StateProps & DispatchProps;

class Items extends Component<Props, {}> {

  componentDidMount(): void {
    this.props.fetchWarehouses();
    this.props.fetchItems();
    this.props.fetchPallets();
    this.props.fetchBoxes();
  }

  render() {
    const { items, fetchItems } = this.props;
    // figure oute what page is currently active
    //const loc = useLocation()
    //const path = loc.pathname
    const page: any = "not catalog" //path.split("/").pop()

    // TEMP: you can manually switch this out to get diffent views
    // TODO: have itemType automatically get set 
    let itemType = "warehouse"
    if (page == "catalog") {
      itemType = "catalog"
    } else {
      // get the params
      const { warehouseid, palletid, boxid }: any = {} // useParams()

      if (boxid) {
        itemType = "unit"
      } else if (palletid) {
        itemType = "box"
      } else if (warehouseid) {
        itemType = "pallet"
      } else {
        itemType = "warehouse"
      }
    }

    // TODO: get this from the url (or state, or router)
    // This is the type of the items being displayed, not the current container
    // this needs to be one of:
    // warehouse, pallet, box, unit

    // generate the item cards
    const itemDivs = []
    for (let itemId in items) { // TODO: => (item of items)
      //let item = items[itemId] // TODO: swap this for real id
      const name = (<h2>{itemType} #{itemId}</h2>)
      const detailsDiv = (<div className="details">details</div>)
      itemDivs.push(<div className="item-card col-sm-6">{name}{detailsDiv}</div>)
    }

    // add the optional 'add' element
    let headerLink = null
    if (itemType == "warehouse") {
      itemDivs.push(ButtonItem("Add Warehouse", "/warehouse/add"))
      headerLink = (<Link className="header-link" to="/catalog">Catalog View</Link>)
    } else if (itemType == "catalog") {
      itemDivs.push(ButtonItem("Add Item", "/catalog/add"))
      headerLink = (<Link className="header-link" to="/">Inventory View</Link>)
    }
    //  {util.navPanel(itemType)}
    return (
      <div className="content">
        <div className="nav">
          <div className="nav-header">
            <Link className="inventory-link" to="/">
              <h1 className="inventory-header">Inventory Management</h1>
            </Link>
            {headerLink}
          </div>
        </div>

        <hr />

        <div className="row">{itemDivs}</div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  warehouses: state.ItemReducer.warehouses,
  items: state.ItemReducer.items,
  pallets: state.ItemReducer.pallets,
  boxes: state.ItemReducer.boxes,
});

const mapDispatchToProps =
  (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
    fetchWarehouses: () => dispatch(fetchWarehouses()),
    fetchItems: () => dispatch(fetchItems()),
    fetchPallets: () => dispatch(fetchPallets()),
    fetchBoxes: () => dispatch(fetchBoxes()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Items);
