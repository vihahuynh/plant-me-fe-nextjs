import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { cartService } from "./../services";

const initCartState = {
  id: null,
  cart: null,
  quantity: 0,
  items: [],
  checkoutAllItems: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initCartState,
  reducers: {
    updateCart(state, action) {
      const { checkoutAllItems, user, id, quantity, items } =
        action.payload.cart;
      state.checkoutAllItems = checkoutAllItems;
      state.items = items;
      state.id = id;
      state.user = user;
      state.quantity = quantity;
    },

    addItem(state, action) {
      const { item } = action.payload;
      const foundItem = current(state).items.find(
        (i) => i.stock === item.stock
      );
      if (foundItem) {
        const updateItem = {
          ...item,
          quantity: foundItem.quantity + item.quantity,
        };
        state.items = current(state).items.map((i) =>
          i.stock === item.stock ? updateItem : i
        );
      } else {
        state.quantity = current(state).quantity + 1;
        state.items = current(state).items.concat(item);
      }
    },

    removeItem(state, action) {
      const { item } = action.payload;
      // const cartToUpdate = { ...cart }
      const foundItem = current(state).items.find(
        (i) => i.stock === item.stock
      );
      if (foundItem) {
        state.quantity = current(state).quantity - 1;
        state.items = current(state).items.filter(
          (i) => i.stock !== item.stock
        );
      }
    },

    updateItem(state, action) {
      const { item } = action.payload;
      const foundItem = current(state).items.find(
        (i) => i.stock === item.stock
      );
      if (foundItem) {
        state.items = current(state).items.map((i) =>
          i.stock === item.stock ? item : i
        );
      }
    },

    toggleCheckoutAll(state, action) {
      state.checkoutAllItems = action.payload.value;
    },

    clearCheckoutItems(state) {
      state.items = current(state).items.filter((i) => !i.isCheckout);
      state.quantity = current(state).items.length;
    },

    clear(state) {
      state.items = [];
      state.quantity = 0;
      state.checkoutAllItems = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(addItem.fulfilled, (state, action) => {
      const { checkoutAllItems, items, quantity } = action.payload;
      state.checkoutAllItems = checkoutAllItems;
      state.items = items;
      state.quantity = quantity;
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      const { checkoutAllItems, items, quantity } = action.payload;
      state.checkoutAllItems = checkoutAllItems;
      state.items = items;
      state.quantity = quantity;
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      const { checkoutAllItems, items, quantity } = action.payload;
      state.checkoutAllItems = checkoutAllItems;
      state.items = items;
      state.quantity = quantity;
    });
    builder.addCase(clearCheckoutItems.fulfilled, (state, action) => {
      const { checkoutAllItems, items, quantity } = action.payload;
      state.checkoutAllItems = checkoutAllItems;
      state.items = items;
      state.quantity = quantity;
    });
    builder.addCase(clear.fulfilled, (state, action) => {
      const { checkoutAllItems, items, quantity } = action.payload;
      state.checkoutAllItems = checkoutAllItems;
      state.items = items;
      state.quantity = quantity;
    });
    builder.addCase(toggleCheckoutAll.fulfilled, (state, action) => {
      const { checkoutAllItems } = action.payload;
      state.checkoutAllItems = checkoutAllItems;
    });
  },
});

export const addItem = createAsyncThunk(
  "cart/addItem",
  async ({ cart, item, token }) => {
    try {
      const cartToUpdate = { ...cart, checkoutAllItems: false };
      const foundItem = cartToUpdate.items.find((i) => i.stock === item.stock);

      if (foundItem) {
        const updateItem = {
          ...item,
          quantity: foundItem.quantity + item.quantity,
        };
        cartToUpdate.items = cartToUpdate.items.map((i) =>
          i.stock === item.stock ? updateItem : i
        );
      } else {
        cartToUpdate.quantity = cartToUpdate.quantity + 1;
        cartToUpdate.items = cartToUpdate.items.concat(item);
      }
      const updatedCart = await cartService.update(
        cart.id,
        cartToUpdate,
        token
      );
      return updatedCart.data;
    } catch (err) {
      console.log(err);
      if (
        err?.response?.data?.error === "token expired" ||
        err?.response?.data?.error === "invalid token"
      ) {
        throw new Error("token expired");
      }
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ cart, item, token }) => {
    try {
      const cartToUpdate = { ...cart };
      const foundItem = cartToUpdate.items.find((i) => i.stock === item.stock);
      if (foundItem) {
        cartToUpdate.quantity = cartToUpdate.quantity - 1;
        cartToUpdate.items = cartToUpdate.items.filter(
          (i) => i.stock !== item.stock
        );
      }
      const updatedCart = await cartService.update(
        cart.id,
        cartToUpdate,
        token
      );
      return updatedCart.data;
    } catch (err) {
      console.log(err);
      if (
        err?.response?.data?.error === "token expired" ||
        err?.response?.data?.error === "invalid token"
      ) {
        throw new Error("token expired");
      }
    }
  }
);

export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ cart, item, token }) => {
    try {
      const cartToUpdate = { ...cart };
      const foundItem = cartToUpdate.items.find((i) => i.stock === item.stock);
      if (foundItem) {
        cartToUpdate.items = cartToUpdate.items.map((i) =>
          i.stock === item.stock ? item : i
        );
      }
      const updatedCart = await cartService.update(
        cart.id,
        cartToUpdate,
        token
      );
      return updatedCart.data;
    } catch (err) {
      console.log(err);
      if (
        err?.response?.data?.error === "token expired" ||
        err?.response?.data?.error === "invalid token"
      ) {
        throw new Error("token expired");
      }
    }
  }
);

export const toggleCheckoutAll = createAsyncThunk(
  "cart/toggleCheckoutAll",
  async ({ cart, value, token }) => {
    try {
      const updatedCart = await cartService.update(
        cart.id,
        { ...cart, checkoutAllItems: value },
        token
      );
      return updatedCart.data;
    } catch (err) {
      console.log(err);
      if (
        err?.response?.data?.error === "token expired" ||
        err?.response?.data?.error === "invalid token"
      ) {
        throw new Error("token expired");
      }
    }
  }
);

export const clearCheckoutItems = createAsyncThunk(
  "cart/clearCheckoutItems",
  async ({ cart, token }) => {
    try {
      const cartToUpdate = { ...cart, checkoutAllItems: false };
      cartToUpdate.items = cartToUpdate.items.filter((i) => !i.isCheckout);
      cartToUpdate.quantity = cartToUpdate.items.length;
      const updatedCart = await cartService.update(
        cart.id,
        cartToUpdate,
        token
      );
      return updatedCart.data;
    } catch (err) {
      console.log(err);
      if (
        err?.response?.data?.error === "token expired" ||
        err?.response?.data?.error === "invalid token"
      ) {
        throw new Error("token expired");
      }
    }
  }
);

export const clear = createAsyncThunk("cart/clear", async ({ cart, token }) => {
  try {
    const cartToUpdate = {
      ...cart,
      items: [],
      quantity: 0,
      checkoutAllItems: false,
    };
    const updatedCart = await cartService.update(cart.id, cartToUpdate, token);
    return updatedCart.data;
  } catch (err) {
    if (
      err?.response?.data?.error === "token expired" ||
      err?.response?.data?.error === "invalid token"
    ) {
      throw new Error("token expired");
    }
  }
});

export default cartSlice;
