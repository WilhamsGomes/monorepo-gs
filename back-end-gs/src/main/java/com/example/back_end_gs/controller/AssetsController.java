package com.example.back_end_gs.controller;

import com.example.back_end_gs.domain.AssetsEntity;
import com.example.back_end_gs.domain.AssetRequest;
import com.example.back_end_gs.domain.AssetResponse;
import com.example.back_end_gs.service.AssetsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
public class AssetsController {

    private final AssetsService service;

    public AssetsController(AssetsService service) {
        this.service = service;
    }

    @CrossOrigin
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AssetResponse create(@RequestBody @Valid AssetRequest req) {
        return toResponse(service.create(req));
    }

    @CrossOrigin
    @GetMapping
    public List<AssetResponse> list() {
        return service.findAll().stream().map(this::toResponse).toList();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public AssetResponse get(@PathVariable Long id) {
        return toResponse(service.findById(id));
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public AssetResponse update(@PathVariable Long id, @RequestBody @Valid AssetRequest req) {
        return toResponse(service.update(id, req));
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    private AssetResponse toResponse(AssetsEntity a) {
        AssetResponse r = new AssetResponse();
        r.id = a.getId();
        r.name = a.getName();
        r.category = a.getCategory();
        r.serialNumber = a.getSerialNumber();
        r.acquisitionDate = a.getAcquisitionDate();
        r.status = a.getStatus();
        return r;
    }
}
