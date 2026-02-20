package com.example.back_end_gs.service;

import com.example.back_end_gs.domain.AssetsEntity;
import com.example.back_end_gs.domain.AssetRequest;
import com.example.back_end_gs.repository.AssetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetsService {

    private final AssetRepository repo;

    public AssetsService(AssetRepository repo) {
        this.repo = repo;
    }

    public AssetsEntity create(AssetRequest req) {
        if (repo.existsBySerialNumber(req.serialNumber)) {
            throw new IllegalArgumentException("serialNumber já cadastrado");
        }
        AssetsEntity a = new AssetsEntity();
        apply(a, req);
        return repo.save(a);
    }

    public List<AssetsEntity> findAll() {
        return repo.findAll();
    }

    public AssetsEntity findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Ativo não encontrado"));
    }

    public AssetsEntity update(Long id, AssetRequest req) {
        AssetsEntity a = findById(id);
        // if (repo.existsBySerialNumberAndIdNot(req.serialNumber, id)) {
        //     throw new IllegalArgumentException("serialNumber já cadastrado");
        // }
        apply(a, req);
        return repo.save(a);
    }

    public void delete(Long id) {
        AssetsEntity a = findById(id);
        repo.delete(a);
    }

    private void apply(AssetsEntity a, AssetRequest req) {
        a.setName(req.name);
        a.setCategory(req.category);
        a.setSerialNumber(req.serialNumber);
        a.setAcquisitionDate(req.acquisitionDate);
        a.setStatus(req.status);
    }
}
