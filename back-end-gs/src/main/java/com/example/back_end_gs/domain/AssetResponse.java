package com.example.back_end_gs.domain;

import java.time.LocalDate;

public class AssetResponse {
    public Long id;
    public String name;
    public String category;
    public String serialNumber;
    public LocalDate acquisitionDate;
    public AssetStatus status;
}
