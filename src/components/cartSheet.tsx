"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { convertS3ToImageKit } from "@/helper/imagekit";
import { useStore } from "@/helper/store/zustand";
import {
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useRouter } from "next/navigation";

export function CartSheet() {
  const {
    productStore: cart,
    removeItemFromStore,
    increaseQuantity,
    decreaseQuantity,
  } = useStore();

  const cartQuentity = cart?.length;
  const router = useRouter();
  function handleProcedeToCheckout() {
    router.push("/checkout");
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer px-2 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-3 md:text-base">
          <ShoppingBag color="#ccc" />
          <span className="absolute -top-2 right-0 z-10 text-white">
            {cartQuentity}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className=" border-l-neutral-700 bg-neutral-950 text-white w-full overflow-y-auto sm:min-w-[36rem]">
        <SheetHeader>
          <SheetTitle className=" text-white">Your Cart</SheetTitle>
        </SheetHeader>
        <div className=" mt-4">
          {cartQuentity === 0 ? (
            <div className="flex  justify-center items-center gap-4 opacity-60 mt-12 ">
              <ShoppingCart size={52} />
              <p className="text-center text-lg font-semibold  text-white">
                Your cart is empty
              </p>
            </div>
          ) : (
            <div className="  gap-4">
              {cart.map((item: any) => (
                <div key={item.id} className=" flex gap-1 py-4">
                  <div className="col-span-1 flex w-full flex-col gap-3 md:flex-row  md:space-x-4">
                    <div className="relative size-16 shrink-0 rounded-lg md:size-20">
                      <Image
                        // src={}
                        src={convertS3ToImageKit(item.image)}
                        alt={item.name}
                        height={100}
                        width={100}
                        className="rounded object-cover"
                      />
                      <p
                        className=" p-1.5 rounded-full bg-neutral-400 absolute -top-2 -left-2 cursor-pointer"
                        onClick={() => removeItemFromStore(item.id)}
                      >
                        <X size={14} />
                      </p>
                    </div>
                    <div>
                      <h3 className="line-clamp-2 text-sm text-neutral-300 md:text-lg">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <div className=" flex flex-col justify-between gap-2">
                    <div className="col-span-1 text-right text-lg text-p-green">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="col-span-1 border border-gray-600  rounded-3xl overflow-hidden flex h-fit items-center justify-end  gap-2">
                      <button
                        className="flex items-center justify-center hover:bg-neutral-700 px-3 py-2 duration-200 h-full w-full text-white"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        className="flex items-center justify-center hover:bg-neutral-700 px-3 py-2 duration-200 h-full w-full text-white"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <SheetFooter className=" w-full mt-24">
          {cartQuentity > 0 && (
            <div className=" w-full">
              <Table>
                <TableBody>
                  <TableRow className=" hover:bg-neutral-900">
                    <TableHead>Taxes</TableHead>
                    <TableCell className=" w-52 text-xl">Rs 0</TableCell>
                  </TableRow>

                  <TableRow className=" hover:bg-neutral-900">
                    <TableHead>Shipping</TableHead>
                    <TableHead>Yet to caluclate</TableHead>
                  </TableRow>
                  <TableRow className=" hover:bg-neutral-900">
                    <TableHead>Total</TableHead>
                    <TableCell className=" w-52 text-xl">
                      Rs{" "}
                      {cart
                        .reduce(
                          (total: number, item: any) =>
                            total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Button
                onClick={handleProcedeToCheckout}
                className=" w-full py-2 mt-3 rounded-xl h-12 bg-neon-green text-black font-semibold text-lg hover:bg-neon-green/70 duration-200"
                type="submit"
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
