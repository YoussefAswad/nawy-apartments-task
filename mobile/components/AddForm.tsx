import { Controller, useForm } from "react-hook-form";
import { ApartmentCreate as formSchema } from "@/types/Apartment.type";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CurrencyCode } from "@/enums/CurrencyCode.enum";

import { TextInput, Text, Button, View, StyleSheet } from "react-native";

import SelectDropdown from "react-native-select-dropdown";

const enumToObjectList = (enumObj: any) => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key))) // Filter out numeric values (in case of numeric enums)
    .map((key) => ({
      label: key,
      value: enumObj[key as keyof typeof enumObj],
    }));
};

type ApartmentAddFromProps = {
  onFormSubmit: (data: z.infer<typeof formSchema>) => void;
  isPending?: boolean;
};

export function AddFrom({ onFormSubmit, isPending }: ApartmentAddFromProps) {
  const CurrencyCodeList = enumToObjectList(CurrencyCode);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      currency: CurrencyCode.EGP,
      location: "",
      contact_person: "",
      contact_phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onFormSubmit(values);
  }

  console.log(errors);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: 10,
        marginBottom: 20,
      }}
    >
      <Text style={{ fontSize: 20 }}>Apartment Information</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      <Text>Price</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Price"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
          />
        )}
        name="price"
      />
      {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectDropdown
            data={CurrencyCodeList}
            onSelect={(selectedItem, index) => {
              onChange(selectedItem.value);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.label) || "Select Currency"}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        )}
        name="currency"
      />
      {errors.currency && (
        <Text style={styles.error}>{errors.currency.message}</Text>
      )}

      <Text>Area</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="area"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
          />
        )}
        name="area"
      />
      {errors.area && <Text style={styles.error}>{errors.area.message}</Text>}

      <Text>Rooms</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="No. Bed Rooms"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
          />
        )}
        name="bed_rooms"
      />
      {errors.bed_rooms && (
        <Text style={styles.error}>{errors.bed_rooms.message}</Text>
      )}

      <Text>Bath Rooms</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="No. Bath Rooms"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
          />
        )}
        name="bath_rooms"
      />
      {errors.bath_rooms && (
        <Text style={styles.error}>{errors.bath_rooms.message}</Text>
      )}

      <Text>Floor</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Floor"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
          />
        )}
        name="floor"
      />
      {errors.floor && <Text style={styles.error}>{errors.floor.message}</Text>}

      <Text>Location</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Location"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="location"
      />
      {errors.location && (
        <Text style={styles.error}>{errors.location.message}</Text>
      )}

      <Text>Description</Text>
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={true}
            numberOfLines={4}
          />
        )}
        name="description"
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description.message}</Text>
      )}

      <Text style={{ fontSize: 20 }}>Contact Information</Text>

      <Text>Name</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Contact Person"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="contact_person"
      />
      {errors.contact_person && (
        <Text style={styles.error}>{errors.contact_person.message}</Text>
      )}

      <Text>Phone</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Contact Phone"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="contact_phone"
      />
      {errors.contact_phone && (
        <Text style={styles.error}>{errors.contact_phone.message}</Text>
      )}

      <Text>Email</Text>
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Contact Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="contact_email"
      />
      {errors.contact_email && (
        <Text style={styles.error}>{errors.contact_email.message}</Text>
      )}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  input: {
    padding: 10,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
