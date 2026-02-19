package com.example.back_end_gs.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class AssetRequest {
    @NotBlank
    public String name;

    @NotBlank
    public String category;

    @NotBlank
    public String serialNumber;

    @NotNull
    public LocalDate acquisitionDate; // recebe "YYYY-MM-DD"

    @NotNull
    public AssetStatus status;
}
