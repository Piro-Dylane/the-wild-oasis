import { useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { booking = {}, isPending } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(booking.isPaid);
  const [addBreakFast, setAddBreakFast] = useState(booking.hasBreakfast);
  const { settings, isPending: isLoadingSettings } = useSettings();

  /*   useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking.isPaid]); */

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const { checkin, isCheckingIn } = useCheckin();

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakFast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  if (isPending || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast">
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}>
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
